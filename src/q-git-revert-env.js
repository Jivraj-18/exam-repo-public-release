import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";
import JSZip from "https://cdn.jsdelivr.net/npm/jszip@3/+esm";
import pako from "https://cdn.jsdelivr.net/npm/pako@2/+esm";
import { download } from "./download.js";

const randInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;

const generateHexString = (random, length) => {
    const chars = "0123456789abcdef";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(random() * chars.length)];
    }
    return result;
};


const generateSampleJWT = (random, user) => {
    const header = { alg: "HS256", typ: "JWT" };
    const payload = {
        email: user.email,
    }
    const encode = (obj) => btoa(JSON.stringify(obj)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const signature = generateHexString(random, 32);
    return `${encode(header)}.${encode(payload)}.${signature}`;
};


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

// Realistic commit message templates for a web application project
const commitMessages = [
    "Set up project structure with Flask",
    "Add user authentication module",
    "Implement login and registration endpoints",
    "Add database models for users and posts",
    "Create REST API for blog posts",
    "Add pagination to post listing",
    "Implement search functionality",
    "Add unit tests for auth module",
    "Fix password hashing vulnerability",
    "Update dependencies to latest versions",
    "Add rate limiting to API endpoints",
    "Implement caching layer with Redis",
    "Add Docker configuration for deployment",
    "Set up CI/CD pipeline with GitHub Actions",
    "Add API documentation with Swagger",
    "Implement email verification flow",
    "Add password reset functionality",
    "Fix CORS issues for frontend",
    "Add input validation middleware",
    "Implement file upload feature",
    "Add image resizing for thumbnails",
    "Fix memory leak in background jobs",
    "Add health check endpoint",
    "Implement WebSocket notifications",
    "Add user profile management",
    "Fix SQL injection vulnerability",
    "Add admin dashboard endpoints",
    "Implement audit logging",
    "Add metrics collection with Prometheus",
];

// Commit messages that could plausibly include .env (to not give it away)
const neutralCommitMessages = [
    "Add project configuration files",
    "Set up development environment",
    "Configure application settings",
    "Add build and deployment scripts",
    "Update project dependencies",
    "Refactor configuration management",
    "Add local development setup",
    "Configure database connection",
    "Set up logging configuration",
    "Add Docker compose for local dev",
];


export default async function ({ user, weight = 2 }) {
    const id = "q-git-revert-env";
    const title = "Git Security Fix: Reverting .env Commit";
    const random = seedrandom(`${user.email}#${id}`);

    // Generate seeded values using realistic names
    const projectName = id;
    const developer = user

    const authorName = "Developer"
    const authorEmail = `${developer.email}`;

    // Secret key patterns for .env
    const secretPatterns = [
        { key: "DATABASE_URL", value: (r) => `postgres://admin:${generateHexString(r, 16)}@db.prod.internal:5432/maindb` },
        { key: "API_SECRET", value: (r) => `sk_live_${generateHexString(r, 32)}` },
        { key: "JWT_SECRET", value: (r) => generateHexString(r, 64) },
        { key: "AWS_SECRET_ACCESS_KEY", value: (r) => generateHexString(r, 40) },
        { key: "AIPIPE_TOKEN", value: (r) => generateSampleJWT(r, user) }
    ];

    // Generate between 15-25 commits
    const numCommits = randInt(random, 15, 25);

    // Decide which commit (not first, not last few) will add the .env file
    const envCommitIndex = randInt(random, 3, Math.floor(numCommits / 2));

    // Generate secret values for .env
    const secrets = [];
    const numSecrets = randInt(random, 3, 5);
    const shuffledPatterns = [...secretPatterns].sort(() => random() - 0.5);
    for (let i = 0; i < numSecrets; i++) {
        const pattern = shuffledPatterns[i];
        secrets.push({ key: pattern.key, value: pattern.value(random) });
    }

    // Store the expected .env content for validation
    const envContent = secrets.map((s) => `${s.key}=${s.value}`).join("\n") + "\n";

    // Generate commit data with shuffled messages
    const commits = [];
    const shuffledMessages = [...commitMessages].sort(() => random() - 0.5);
    for (let i = 0; i < numCommits; i++) {
        let message;
        if (i === 0) {
            message = "Initial commit";
        } else if (i === envCommitIndex) {
            // Use a neutral message that doesn't give away that .env was added
            message = pick(neutralCommitMessages, random);
        } else {
            message = shuffledMessages[(i - 1) % shuffledMessages.length];
        }
        const baseTime = new Date("2024-09-01T10:00:00Z").getTime();
        const timeOffset = i * randInt(random, 7200, 86400) * 1000;
        commits.push({
            message,
            timestamp: new Date(baseTime + timeOffset),
            hasEnv: i >= envCommitIndex,
        });
    }

    let zipBlob = null;
    const author = { name: authorName, email: authorEmail };

    // Function to create the git repository
    const createGitRepo = async () => {
        if (zipBlob) return zipBlob;

        const zip = new JSZip();
        const repoFolder = zip.folder(projectName);
        const gitFolder = repoFolder.folder(".git");
        const objectsFolder = gitFolder.folder("objects");

        const commitHashes = [];
        let lastCommitHash = null;

        // Track file blobs for each commit - ensure each commit changes something
        const fileVersions = {
            readme: 0,
            app: 0,
            requirements: 0,
        };

        // Store final blobs for index creation
        let finalBlobs = [];
        let lastTimestamp = null;

        for (let i = 0; i < commits.length; i++) {
            const commit = commits[i];
            lastTimestamp = commit.timestamp;

            // Increment version counters - each commit changes at least one file
            if (i === 0) {
                fileVersions.readme = 1;
                fileVersions.app = 1;
                fileVersions.requirements = 1;
            } else {
                // Rotate which file gets updated
                const fileToUpdate = i % 3;
                if (fileToUpdate === 0) fileVersions.readme++;
                else if (fileToUpdate === 1) fileVersions.app++;
                else fileVersions.requirements++;
            }

            // Create README content with version
            const readmeContent = `# ${projectName}

A Flask-based REST API service.

## Version

${fileVersions.readme}.0.0

## Quick Start

\`\`\`bash
pip install -r requirements.txt
python app.py
\`\`\`

## API Endpoints

- \`GET /health\` - Health check
- \`POST /api/v1/login\` - User authentication
- \`GET /api/v1/users\` - List users
- \`POST /api/v1/register\` - Register new user

## Environment Variables

Copy \`.env.example\` to \`.env\` and configure:

- \`DATABASE_URL\` - PostgreSQL connection string
- \`JWT_SECRET\` - Secret for JWT tokens
- \`REDIS_URL\` - Redis connection for caching

## Development

\`\`\`bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask run --debug
\`\`\`

## Testing

\`\`\`bash
pytest tests/ -v
\`\`\`

## License

MIT
`;

            // Create app.py content with version comment
            const appContent = `#!/usr/bin/env python3
"""Flask application entry point.

Version: ${fileVersions.app}.0.0
"""
import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
jwt = JWTManager(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())


@app.route('/health')
def health():
    """Health check endpoint."""
    return jsonify({"status": "healthy", "version": "${fileVersions.app}.0.0"})


@app.route('/api/v1/login', methods=['POST'])
def login():
    """Authenticate user and return JWT token."""
    data = request.get_json()
    # Authentication logic here
    return jsonify({"message": "Login endpoint"})


@app.route('/api/v1/users')
@jwt_required()
def list_users():
    """List all users (protected endpoint)."""
    return jsonify({"users": []})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
`;

            // Create requirements.txt with version comment
            const requirementsContent = `# Requirements v${fileVersions.requirements}
Flask==2.3.3
Flask-SQLAlchemy==3.1.1
Flask-JWT-Extended==4.5.3
psycopg2-binary==2.9.9
redis==5.0.1
python-dotenv==1.0.0
gunicorn==21.2.0
pytest==7.4.3
`;

            // Create blobs
            const readmeBlob = await createBlob(readmeContent);
            const appBlob = await createBlob(appContent);
            const requirementsBlob = await createBlob(requirementsContent);

            objectsFolder.folder(readmeBlob.hash.substring(0, 2)).file(readmeBlob.hash.substring(2), readmeBlob.compressed);
            objectsFolder.folder(appBlob.hash.substring(0, 2)).file(appBlob.hash.substring(2), appBlob.compressed);
            objectsFolder
                .folder(requirementsBlob.hash.substring(0, 2))
                .file(requirementsBlob.hash.substring(2), requirementsBlob.compressed);

            // Tree entries - always include README, app.py, requirements.txt
            const treeEntries = [
                { mode: "100644", name: "README.md", hash: readmeBlob.hash },
                { mode: "100644", name: "app.py", hash: appBlob.hash },
                { mode: "100644", name: "requirements.txt", hash: requirementsBlob.hash },
            ];

            // Track blobs for final state
            finalBlobs = [
                { name: "README.md", hash: readmeBlob.hash, size: readmeBlob.size, content: readmeBlob.content },
                { name: "app.py", hash: appBlob.hash, size: appBlob.size, content: appBlob.content },
                { name: "requirements.txt", hash: requirementsBlob.hash, size: requirementsBlob.size, content: requirementsBlob.content },
            ];

            // Add .env file from envCommitIndex onwards
            if (commit.hasEnv) {
                const envBlob = await createBlob(envContent);
                objectsFolder.folder(envBlob.hash.substring(0, 2)).file(envBlob.hash.substring(2), envBlob.compressed);
                treeEntries.push({ mode: "100644", name: ".env", hash: envBlob.hash });
                finalBlobs.push({ name: ".env", hash: envBlob.hash, size: envBlob.size, content: envBlob.content });
            }

            // Create tree
            const tree = await createTree(treeEntries);
            objectsFolder.folder(tree.hash.substring(0, 2)).file(tree.hash.substring(2), tree.compressed);

            // Create commit
            const commitObj = await createCommit({
                treeHash: tree.hash,
                parentHash: lastCommitHash,
                message: commit.message,
                author,
                timestamp: commit.timestamp,
            });
            objectsFolder.folder(commitObj.hash.substring(0, 2)).file(commitObj.hash.substring(2), commitObj.compressed);

            commitHashes.push(commitObj.hash);

            // Store the hash of the commit that added .env
            let envCommitHash = null;
            if (i === envCommitIndex) {
                envCommitHash = commitObj.hash;
            }

            lastCommitHash = commitObj.hash;
        }

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
        const indexEntries = finalBlobs.map((b) => ({
            name: b.name,
            hash: b.hash,
            size: b.size,
        }));
        const indexData = await createIndex(indexEntries, lastTimestamp);
        gitFolder.file("index", indexData);

        // Add working directory files matching HEAD exactly
        for (const blob of finalBlobs) {
            repoFolder.file(blob.name, blob.content);
        }

        zipBlob = await zip.generateAsync({ type: "blob" });
        return zipBlob;
    };

    const question = html`
    <div class="mb-3">
      <h4>Case Study: Git Security Fix: Reverting .env Commit</h4>
      <p>
        <strong>Scenario:</strong> A developer on your team accidentally committed a <code>.env</code> file containing
        sensitive API keys and database credentials. The security team has flagged this as a critical issue. You need
        to identify when this file was added and remove it from the repository's history entirely.
      </p>
      <ol>
        <li>Download the repository zip file below</li>
        <li>Extract and navigate into the repository folder</li>
        <li>Use git commands to find the commit that added <code>.env</code></li>
        <li>Remove the <code>.env</code> file from every commit in the history</li>
        <li>Ensure <code>.env</code> is gone from the entire history</li>
        <li>Create a <code>.gitignore</code> file and add <code>.env</code> to it</li>
        <li>Create a <code>.env.example</code> file with placeholder values for the secrets</li>
        <li>Commit the <code>.gitignore</code> and <code>.env.example</code> file</li>
        <li>Push the repository to your GitHub account (force push will be needed)</li>
        <li>Enter the GitHub repository URL below</li>
      </ol>
      <p>
        Download the repository:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${async () => download(await createGitRepo(), `${id}.zip`)}>
          ${id}.zip
        </button>
      </p>
      <label for="${id}" class="form-label">Enter your GitHub repository URL:</label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="url"
        placeholder="https://github.com/username/repo-name"
      />
    </div>
  `;

    const answer = async (url) => {
        if (!url || typeof url !== "string") {
            throw new Error("GitHub repository URL is required");
        }

        const trimmed = url.trim();
        if (trimmed.length === 0) {
            throw new Error("URL cannot be empty");
        }

        // Parse GitHub URL
        const githubMatch = trimmed.match(/github\.com\/([^\/]+)\/([^\/\s]+)/i);
        if (!githubMatch) {
            throw new Error("Please provide a valid GitHub repository URL (e.g., https://github.com/username/repo)");
        }

        const [, owner, repo] = githubMatch;
        const repoName = repo.replace(/\.git$/, "").replace(/\/$/, "");

        // Check if repository exists then fetch all commits to check history
        const commitsUrl = `https://api.github.com/repos/${owner}/${repoName}/commits?per_page=100`;
        let commits;
        try {
            const commitsResponse = await fetch(commitsUrl);
            if (!commitsResponse.ok) {
                if (commitsResponse.status === 409) {
                    throw new Error("The repository appears to be empty. Did you push your changes?");
                }
                if (commitsResponse.status === 404) {
                    throw new Error("Repository not found. Make sure it exists and is public.");
                }
                throw new Error(`GitHub API error: ${commitsResponse.status}`);
            }
            commits = await commitsResponse.json();
        } catch (e) {
            throw new Error(`Could not verify commit history: ${e.message}`);
        }

        // Check if .env exists in the history
        const envHistoryUrl = `https://api.github.com/repos/${owner}/${repoName}/commits?path=.env`;
        let envCommits = [];
        try {
            const envResponse = await fetch(envHistoryUrl);
            if (envResponse.ok) {
                envCommits = await envResponse.json();
            }
        } catch (e) {
            throw new Error(`Could not verify .env history: ${e.message}`);
        }

        if (Array.isArray(envCommits) && envCommits.length > 0) {
            throw new Error(
                `The .env file was found in the history. You must remove it from the history.`,
            );
        }

        // Check if .gitignore exists and contains .env
        const gitignoreUrl = `https://api.github.com/repos/${owner}/${repoName}/contents/.gitignore`;
        let gitignoreContent = null;
        try {
            const gitignoreResponse = await fetch(gitignoreUrl);
            if (gitignoreResponse.ok) {
                const data = await gitignoreResponse.json();
                gitignoreContent = atob(data.content);
            } else {
                throw new Error("The .gitignore file is missing. Please create it and add .env to it.");
            }
        } catch (e) {
            throw new Error(`Could not verify .gitignore: ${e.message}`);
        }

        if (!gitignoreContent || !gitignoreContent.includes(".env")) {
            throw new Error("The .gitignore file does not contain .env.");
        }

        // Verify the original commit history and author exists (repo wasn't recreated from scratch)
        const hasProjectHistory = commits.some(
            (c) =>
                c.commit &&
                c.commit.message &&
                (c.commit.message.toLowerCase().includes("initial commit") ||
                    c.commit.message.toLowerCase().includes("flask") ||
                    c.commit.message.toLowerCase().includes("authentication") ||
                    c.commit.message.toLowerCase().includes("api") ||
                    c.commit.message.toLowerCase().includes("database")) &&
                c.commit.author &&
                c.commit.author.email === user.email,
        );

        if (!hasProjectHistory || commits.length < 10) {
            throw new Error(
                "The repository appears to be missing the original commit history. Please use the provided repository.",
            );
        }

        // // Check for .gitignore in the latest commit
        // const gitignoreUrl = `https://api.github.com/repos/${owner}/${repoName}/contents/.gitignore`;
        // try {
        //   const response = await fetch(gitignoreUrl);
        //   if (!response.ok) {
        //     if (response.status === 404) {
        //       throw new Error("The .gitignore file is missing. Please create it and add .env to it.");
        //     }
        //     // throw new Error(`GitHub API error: ${response.status}`);
        //   } else {
        //     const data = await response.json();
        //     const content = atob(data.content);
        //     if (!content.includes(".env")) {
        //       throw new Error("The .gitignore file does not contain .env.");
        //     }
        //   }
        // } catch (e) {
        //   if (e.message.includes("missing") || e.message.includes("contain")) throw e;
        //   // Ignore other errors
        // }

        return true;
    };

    return { id, title, weight, question, answer };
}

/*
Solution Guide:

1. Download and extract the zip file:
   - Click the download button to get the zip
   - Extract: unzip q-git-revert-env.zip

2. Navigate into the repository:
   cd q-git-revert-env

3. Initialize the working directory:
   git checkout main
   
   This ensures the working directory matches HEAD.

4. Verify the repository state:
   git status
   # Should show: "nothing to commit, working tree clean"
   
   ls -la
   # Should show: .env, README.md, app.py, requirements.txt

5. Find the commit that added .env:
   git log --diff-filter=A -- .env
   
   This shows the commit that Added the .env file.
   Note the commit hash (e.g., a1b2c3d4e5f6...)

6. Remove the file from history:
   
   Option A: Interactive Rebase (Recommended)
   git rebase -i <commit-hash>^
   # Mark the commit as 'edit'
   # When rebase stops:
   git rm .env
   git commit --amend
   git rebase --continue

   Option B: Filter-Repo (Advanced)
   git filter-repo --path .env --invert-paths
   # (Requires git-filter-repo tool)

7. Verify .env is removed from history:
   git log --all -- .env
   # Should show no output
   
   ls -la
   # .env should NOT be listed

8. Add .gitignore:
   echo ".env" > .gitignore
   git add .gitignore
   git commit -m "Add .gitignore"

9. Create a new GitHub repository:
   - Go to github.com
   - Click "New repository"
   - Name it (e.g., "git-revert-exercise")
   - Make it PUBLIC
   - Do NOT initialize with README

10. Push to GitHub:
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main --force

11. Enter the GitHub URL in the answer field:
    https://github.com/YOUR_USERNAME/YOUR_REPO

Validation checks:
- Repository is publicly accessible
- .env file does NOT exist in ANY commit in the history
- .gitignore file exists and contains .env
*/
