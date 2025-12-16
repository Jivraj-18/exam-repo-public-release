import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";
import JSZip from "https://cdn.jsdelivr.net/npm/jszip@3/+esm";
import pako from "https://cdn.jsdelivr.net/npm/pako@2/+esm";
import { download } from "./download.js";

const randInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;

// SHA-1 hash implementation for git objects
async function sha1(data) {
    const buffer = typeof data === "string" ? new TextEncoder().encode(data) : data;
    const hashBuffer = await crypto.subtle.digest("SHA-1", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Create a git blob object
async function createBlob(content) {
    const encoder = new TextEncoder();
    const contentBytes = encoder.encode(content);
    const header = `blob ${contentBytes.length}\0`;
    const headerBytes = encoder.encode(header);
    const store = new Uint8Array(headerBytes.length + contentBytes.length);
    store.set(headerBytes, 0);
    store.set(contentBytes, headerBytes.length);
    const hash = await sha1(store);
    const compressed = pako.deflate(store);
    return { hash, compressed, content, size: contentBytes.length };
}

// Create a git tree object
async function createTree(entries) {
    // Git requires strict byte comparison for sorting
    const sorted = [...entries].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    const binaryParts = [];
    for (const entry of sorted) {
        const mode = entry.mode || "100644";
        const entryHeader = `${mode} ${entry.name}\0`;
        binaryParts.push(new TextEncoder().encode(entryHeader));
        const hashBytes = new Uint8Array(20);
        for (let i = 0; i < 20; i++) {
            hashBytes[i] = parseInt(entry.hash.substr(i * 2, 2), 16);
        }
        binaryParts.push(hashBytes);
    }
    const totalLength = binaryParts.reduce((sum, part) => sum + part.length, 0);
    const treeData = new Uint8Array(totalLength);
    let offset = 0;
    for (const part of binaryParts) {
        treeData.set(part, offset);
        offset += part.length;
    }
    const header = new TextEncoder().encode(`tree ${treeData.length}\0`);
    const store = new Uint8Array(header.length + treeData.length);
    store.set(header, 0);
    store.set(treeData, header.length);
    const hash = await sha1(store);
    const compressed = pako.deflate(store);
    return { hash, compressed };
}

// Create a git commit object
async function createCommit({ treeHash, parentHash, message, author, timestamp }) {
    let content = `tree ${treeHash}\n`;
    if (parentHash) {
        content += `parent ${parentHash}\n`;
    }
    const ts = Math.floor(timestamp.getTime() / 1000);
    content += `author ${author.name} <${author.email}> ${ts} +0000\n`;
    content += `committer ${author.name} <${author.email}> ${ts} +0000\n`;
    content += `\n${message}\n`;
    const header = `commit ${content.length}\0`;
    const store = header + content;
    const hash = await sha1(store);
    const compressed = pako.deflate(new TextEncoder().encode(store));
    return { hash, compressed, content };
}

// Create git index file
async function createIndex(entries, timestamp) {
    // Git requires strict byte comparison for sorting
    const sorted = [...entries].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    const parts = [];

    // Header: DIRC + version (2) + entry count
    const header = new Uint8Array(12);
    header[0] = 0x44; // D
    header[1] = 0x49; // I
    header[2] = 0x52; // R
    header[3] = 0x43; // C
    // Version 2 (big endian)
    header[4] = 0;
    header[5] = 0;
    header[6] = 0;
    header[7] = 2;
    // Entry count (big endian)
    const count = sorted.length;
    header[8] = (count >> 24) & 0xff;
    header[9] = (count >> 16) & 0xff;
    header[10] = (count >> 8) & 0xff;
    header[11] = count & 0xff;
    parts.push(header);

    const ts = Math.floor(timestamp.getTime() / 1000);

    for (const entry of sorted) {
        // Each entry: 62 bytes minimum + name + padding
        const entryParts = [];

        // ctime seconds (4) + nanoseconds (4)
        const ctime = new Uint8Array(8);
        ctime[0] = (ts >> 24) & 0xff;
        ctime[1] = (ts >> 16) & 0xff;
        ctime[2] = (ts >> 8) & 0xff;
        ctime[3] = ts & 0xff;
        entryParts.push(ctime);

        // mtime seconds (4) + nanoseconds (4)
        const mtime = new Uint8Array(8);
        mtime[0] = (ts >> 24) & 0xff;
        mtime[1] = (ts >> 16) & 0xff;
        mtime[2] = (ts >> 8) & 0xff;
        mtime[3] = ts & 0xff;
        entryParts.push(mtime);

        // dev (4) + ino (4) - use zeros
        entryParts.push(new Uint8Array(8));

        // mode (4) - 100644 = 0x81a4
        const mode = new Uint8Array(4);
        mode[0] = 0;
        mode[1] = 0;
        mode[2] = 0x81;
        mode[3] = 0xa4;
        entryParts.push(mode);

        // uid (4) + gid (4) - use zeros
        entryParts.push(new Uint8Array(8));

        // file size (4)
        const size = new Uint8Array(4);
        size[0] = (entry.size >> 24) & 0xff;
        size[1] = (entry.size >> 16) & 0xff;
        size[2] = (entry.size >> 8) & 0xff;
        size[3] = entry.size & 0xff;
        entryParts.push(size);

        // SHA-1 hash (20 bytes)
        const hashBytes = new Uint8Array(20);
        for (let i = 0; i < 20; i++) {
            hashBytes[i] = parseInt(entry.hash.substr(i * 2, 2), 16);
        }
        entryParts.push(hashBytes);

        // flags (2) - name length (max 0xFFF)
        const nameLen = Math.min(entry.name.length, 0xfff);
        const flags = new Uint8Array(2);
        flags[0] = (nameLen >> 8) & 0x0f;
        flags[1] = nameLen & 0xff;
        entryParts.push(flags);

        // name (null-terminated, padded to 8-byte boundary)
        const nameBytes = new TextEncoder().encode(entry.name + "\0");
        const entryLen = 62 + nameBytes.length;
        const padding = (8 - (entryLen % 8)) % 8;
        const namePadded = new Uint8Array(nameBytes.length + padding);
        namePadded.set(nameBytes, 0);
        entryParts.push(namePadded);

        // Combine entry parts
        const entryTotal = entryParts.reduce((sum, p) => sum + p.length, 0);
        const entryData = new Uint8Array(entryTotal);
        let offset = 0;
        for (const part of entryParts) {
            entryData.set(part, offset);
            offset += part.length;
        }
        parts.push(entryData);
    }

    // Combine all parts
    const totalLen = parts.reduce((sum, p) => sum + p.length, 0);
    const indexData = new Uint8Array(totalLen);
    let offset = 0;
    for (const part of parts) {
        indexData.set(part, offset);
        offset += part.length;
    }

    // Calculate and append SHA-1 checksum
    const checksum = await sha1(indexData);
    const checksumBytes = new Uint8Array(20);
    for (let i = 0; i < 20; i++) {
        checksumBytes[i] = parseInt(checksum.substr(i * 2, 2), 16);
    }

    const finalIndex = new Uint8Array(indexData.length + 20);
    finalIndex.set(indexData, 0);
    finalIndex.set(checksumBytes, indexData.length);

    return finalIndex;
}

// Commit message templates - expanded for 50+ commits
const commitMessages = [
    "Initial commit",
    "Add configuration file",
    "Update README",
    "Fix typo in docs",
    "Update timeout settings",
    "Refactor config structure",
    "Add logging configuration",
    "Update API endpoint",
    "Fix configuration bug",
    "Bump version number",
    "Add error handling config",
    "Update database settings",
    "Modify retry settings",
    "Change cache duration",
    "Update security settings",
    "Add feature flags",
    "Update rate limiting",
    "Fix memory leak config",
    "Add monitoring settings",
    "Update connection pool",
    "Refactor timeout logic",
    "Add backup configuration",
    "Update SSL settings",
    "Fix race condition",
    "Add health check config",
    "Update worker threads",
    "Modify batch size",
    "Change log level",
    "Update compression settings",
    "Add circuit breaker",
    "Fix deadlock issue",
    "Update queue settings",
    "Add throttling config",
    "Update pagination",
    "Fix null pointer config",
    "Add validation rules",
    "Update serialization",
    "Modify buffer size",
    "Change polling interval",
    "Update proxy settings",
    "Add failover config",
    "Fix timeout overflow",
    "Update auth settings",
    "Add CORS configuration",
    "Modify chunk size",
    "Change heartbeat interval",
    "Update session timeout",
    "Add cleanup config",
    "Fix memory settings",
    "Update thread pool",
    "Add graceful shutdown",
    "Modify max connections",
    "Change request timeout",
    "Update response cache",
];

const authorNames = [
    { "first": "Alice", "last": "Johnson" },
    { "first": "Bob", "last": "Smith" }, { "first": "Carol", "last": "Davis" }, { "first": "David", "last": "Miller" }, { "first": "Eve", "last": "Wilson" }, { "first": "Frank", "last": "Moore" }, { "first": "Grace", "last": "Taylor" }, { "first": "Hank", "last": "Anderson" }, { "first": "Ivy", "last": "Thomas" }, { "first": "Jack", "last": "Jackson" }];

const domains = ["example.com", "test.com", "sample.org", "demo.net"];
export default async function ({ user, weight = 1.5 }) {
    const id = "q-git-time-travel";
    const title = "Git Time Travel: History Investigation";
    const random = seedrandom(`${user.email}#${id}`);

    // Generate seeded values
    const projectName = id;
    const authorName = `${pick(authorNames, random).first} ${pick(authorNames, random).last}`;
    const authorDomain = pick(domains, random);

    // Generate between 50-60 commits
    const numCommits = randInt(random, 50, 60);

    // Generate a sequence of timeout values, one of which will be the target
    const possibleTimeouts = [30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 420, 480, 540, 600, 900, 1200];

    // Pick a random target timeout value for this user (seeded)
    const targetTimeout = pick(possibleTimeouts, random);

    // Decide which commit (not first few, not last few) will have the target timeout
    const targetCommitIndex = randInt(random, 10, numCommits - 10);

    // Generate timeout values for each commit, ensuring target is unique
    const commitTimeouts = [];
    const usedTimeouts = new Set();

    for (let i = 0; i < numCommits; i++) {
        if (i === targetCommitIndex) {
            commitTimeouts.push(targetTimeout);
            usedTimeouts.add(targetTimeout);
        } else {
            // Pick a timeout that's not the target
            let timeout;
            do {
                timeout = pick(possibleTimeouts.filter((v) => v !== targetTimeout), random);
            } while (usedTimeouts.has(timeout) && usedTimeouts.size < possibleTimeouts.length - 1);
            commitTimeouts.push(timeout);
            usedTimeouts.add(timeout);
        }
    }

    // Generate commit data with seeded messages
    const commits = [];
    const shuffledMessages = [...commitMessages].sort(() => random() - 0.5);

    for (let i = 0; i < numCommits; i++) {
        let message;
        if (i === 0) {
            message = "Initial commit";
        } else if (i === targetCommitIndex) {
            message = "Update timeout settings";
        } else {
            message = shuffledMessages[i % shuffledMessages.length] + ` (#${randInt(random, 100, 999)})`;
        }

        // Generate timestamp (spread over past few months, seeded)
        const baseTime = new Date("2024-08-01T10:00:00Z").getTime();
        const timeOffset = i * randInt(random, 7200, 172800) * 1000; // 2 hours to 2 days between commits

        commits.push({
            message,
            timeout: commitTimeouts[i],
            timestamp: new Date(baseTime + timeOffset),
            retries: randInt(random, 1, 5),
            maxConnections: randInt(random, 10, 100),
            debug: random() > 0.7,
        });
    }

    // Variable to store the answer
    let parentShortHash = null;
    let zipBlob = null;

    const author = {
        name: authorName,
        email: `${authorName.toLowerCase()}@${authorDomain}`,
    };

    // Function to create the git repository and zip it
    const createGitRepo = async () => {
        if (zipBlob) return zipBlob;

        const zip = new JSZip();
        const repoFolder = zip.folder(projectName);
        const gitFolder = repoFolder.folder(".git");
        const objectsFolder = gitFolder.folder("objects");

        const commitHashes = [];
        let lastTreeHash = null;
        let lastCommitHash = null;
        let lastConfigContent = null;
        let lastReadmeContent = null;
        let lastConfigBlob = null;
        let lastReadmeBlob = null;

        for (let i = 0; i < commits.length; i++) {
            const commit = commits[i];

            // Create config.json content
            const config = {
                appName: projectName,
                version: `${randInt(random, 1, 3)}.${i}.${randInt(random, 0, 9)}`,
                environment: pick(["development", "staging", "production"], random),
                settings: {
                    timeout: commit.timeout,
                    retries: commit.retries,
                    maxConnections: commit.maxConnections,
                    debug: commit.debug,
                    logLevel: pick(["debug", "info", "warn", "error"], random),
                },
                metadata: {
                    lastUpdated: commit.timestamp.toISOString(),
                    updatedBy: author.name,
                },
            };
            const configContent = JSON.stringify(config, null, 2);

            // Create README content (changes occasionally)
            const readmeContent =
                i === 0 || random() > 0.8
                    ? `# ${projectName}\n\nVersion ${config.version}\n\nA sample project for testing.\n\n## Configuration\n\nSee config.json for settings.\n`
                    : lastReadmeContent;

            // Create blobs
            const configBlob = await createBlob(configContent);
            const readmeBlob = await createBlob(readmeContent);

            lastConfigBlob = configBlob;
            lastReadmeBlob = readmeBlob;

            // Store blob objects
            objectsFolder
                .folder(configBlob.hash.substring(0, 2))
                .file(configBlob.hash.substring(2), configBlob.compressed);
            objectsFolder
                .folder(readmeBlob.hash.substring(0, 2))
                .file(readmeBlob.hash.substring(2), readmeBlob.compressed);

            // Create tree
            const tree = await createTree([
                { mode: "100644", name: "config.json", hash: configBlob.hash },
                { mode: "100644", name: "README.md", hash: readmeBlob.hash },
            ]);

            objectsFolder.folder(tree.hash.substring(0, 2)).file(tree.hash.substring(2), tree.compressed);

            // Create commit
            const commitObj = await createCommit({
                treeHash: tree.hash,
                parentHash: lastCommitHash,
                message: commit.message,
                author,
                timestamp: commit.timestamp,
            });

            objectsFolder
                .folder(commitObj.hash.substring(0, 2))
                .file(commitObj.hash.substring(2), commitObj.compressed);

            commitHashes.push(commitObj.hash);
            lastCommitHash = commitObj.hash;
            lastTreeHash = tree.hash;
            lastConfigContent = configContent;
            lastReadmeContent = readmeContent;
        }

        // The target commit is at targetCommitIndex, its parent is at targetCommitIndex - 1
        parentShortHash = commitHashes[targetCommitIndex - 1].substring(0, 7);

        // Create git refs
        gitFolder.file("HEAD", "ref: refs/heads/main\n");
        gitFolder.folder("refs").folder("heads").file("main", lastCommitHash + "\n");

        // Create git config
        gitFolder.file(
            "config",
            `[core]
\trepositoryformatversion = 0
\tfilemode = true
\tbare = false
\tlogallaliases = false
[user]
\tname = ${author.name}
\temail = ${author.email}
`,
        );

        // Create git index file matching HEAD
        const indexEntries = [
            { name: "config.json", hash: lastConfigBlob.hash, size: lastConfigBlob.size },
            { name: "README.md", hash: lastReadmeBlob.hash, size: lastReadmeBlob.size },
        ];
        const indexData = await createIndex(indexEntries, commits[commits.length - 1].timestamp);
        gitFolder.file("index", indexData);

        // Add working directory files
        repoFolder.file("config.json", lastConfigContent);
        repoFolder.file("README.md", lastReadmeContent);

        zipBlob = await zip.generateAsync({ type: "blob" });
        return zipBlob;
    };

    // Click handler for download button
    const handleDownload = async (e) => {
        const button = e.target;
        button.disabled = true;
        button.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Generating...';

        try {
            const blob = await createGitRepo();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${projectName}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error creating repo:", error);
            alert("Error generating repository: " + error.message);
        }

        button.disabled = false;
        button.innerHTML = "📥 Download Repository";
    };

    const question = html`
    <div class="mb-3">
      <h4>Case Study: Git Time Travel: History Investigation</h4>
      <p>
        <strong>Scenario:</strong> You're investigating a production incident caused by a configuration change. The
        operations team needs to identify when a specific timeout value was introduced so they can understand what other
        changes were deployed at the same time.
      </p>
      <ol>
        <li>Download the repository zip file below</li>
        <li>Extract and navigate into the repository folder</li>
        <li>
          Use Git commands to explore the commit history (e.g., <code>git log</code>, <code>git show</code>,
          <code>git diff</code>)
        </li>
        <li>
          Find the commit where <code>config.json</code> was modified to change the <code>timeout</code> value to
          <strong>${targetTimeout}</strong>
        </li>
        <li>Identify the <strong>parent commit</strong> of that commit</li>
        <li>Enter the 7-character short hash of the parent commit</li>
      </ol>
      <p>
        Download the repository:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${async () => download(await createGitRepo(), `${id}.zip`)}>
          ${id}.zip
        </button>
      </p>
      <label for="${id}" class="form-label">
        What is the 7-character short hash of the <strong>parent</strong> of the commit that set timeout to
        ${targetTimeout}?
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        placeholder="e.g., a1b2c3d"
        pattern="[a-f0-9]{7}"
        maxlength="7"
      />
    </div>
  `;

    const answer = async (input) => {
        if (!input || typeof input !== "string") {
            throw new Error("Answer is required");
        }

        const trimmed = input.trim().toLowerCase();

        if (trimmed.length === 0) {
            throw new Error("Answer cannot be empty");
        }

        if (!/^[a-f0-9]{7}$/.test(trimmed)) {
            throw new Error("Answer must be a 7-character hex string (e.g., a1b2c3d)");
        }

        // Ensure the repo is created to get the answer
        await createGitRepo();

        if (trimmed !== parentShortHash) {
            throw new Error(
                `Incorrect commit hash. Make sure you found the parent of the commit that set timeout to ${targetTimeout}.`,
            );
        }

        return true;
    };

    return { id, title, weight, question, answer };
}

/*
Solution Guide:

Method 1: Using git log with search
1. Download and extract the zip file
2. cd into the project folder (e.g., cd q-git-time-travel)
3. Run: git log -S "timeout\": 300" --oneline -- config.json
   This shows commits where the timeout value 300 appears in the diff
4. The output shows the commit hash, e.g.: "a1b2c3d Update timeout settings"
5. Get the parent hash: git rev-parse a1b2c3d^ --short
   Use a1b2c3d^1 to get the first parent if needed
6. Enter that 7-character hash

Method 2: Using git log with patch view
1. cd into the project folder
2. Run: git log -p -- config.json
3. Scroll through and find the commit with "+  \"timeout\": 300"
4. Note the commit hash from the line "commit abc123def456..."
5. Run: git log --oneline | grep -A1 abc123d
   The line AFTER your commit is the parent
6. Enter the parent's 7-character hash

Method 3: Using git pickaxe with full output
1. cd into the project folder
2. Run: git log -p -S "300" -- config.json | head -100
3. Find the commit that introduced timeout: 300
4. Copy the first 7 characters of the commit hash
5. Run: git rev-parse <hash>~1 | head -c7
6. Enter that hash

Method 4: Scripted approach
1. cd into the project folder
2. Run this one-liner to find commits with timeout 300:
   git log --oneline -- config.json | while read hash msg; do
     git show $hash:config.json 2>/dev/null | grep -q '"timeout": 300' && echo $hash $msg
   done
3. Take the commit hash from the output
4. Run: git rev-parse <hash>^ | head -c7
5. Enter that hash
*/
