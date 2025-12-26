import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-job-runner";
  const title = "Rate-limited Job Runner with Backpressure";

  const random = seedrandom(`${user.email}#${id}`);

  // Simulated job stream: arrival time (seconds) and duration (seconds)
  // Deterministic stream for the user
  const jobs = [
    { id: "j1", arrive: 0, dur: 5 },
    { id: "j2", arrive: 1, dur: 4 },
    { id: "j3", arrive: 1.5, dur: 3 },
    { id: "j4", arrive: 2, dur: 7 },
    { id: "j5", arrive: 3, dur: 2 },
    { id: "j6", arrive: 3.1, dur: 2 },
    { id: "j7", arrive: 3.2, dur: 2 },
    { id: "j8", arrive: 6, dur: 1 },
  ];

  const max_concurrent = 2;
  const q_limit = 2; // maximum queued jobs

  // Simulate: if queue is full and all workers busy, reject
  const simulate = () => {
    const running = [];
    const queue = [];
    const rejected = [];

    let t = 0;
    const startJob = (job) => {
      running.push({ ...job, ends: t + job.dur });
    };

    // process events in arrival order and time-simulate
    jobs.forEach((job) => {
      // advance time to job arrival and clear finished
      t = job.arrive;
      for (let i = running.length - 1; i >= 0; i--) {
        if (running[i].ends <= t) running.splice(i, 1);
      }
      // If we have available worker, start immediately
      if (running.length < max_concurrent) {
        startJob(job);
      } else if (queue.length < q_limit) {
        queue.push(job);
      } else {
        rejected.push(job);
      }
      // After enqueue, try to promote queued jobs in case some ended exactly at arrival
      while (running.length < max_concurrent && queue.length) {
        const next = queue.shift();
        startJob(next);
      }
    });

    return { rejectedCount: rejected.length, rejectedIds: rejected.map((r) => r.id) };
  };

  const sim = simulate();

  const answer = async (value) => {
    const num = Number(value);
    if (!Number.isFinite(num)) throw new Error("Enter the number of rejected jobs as a number");
    if (num !== sim.rejectedCount) throw new Error(`Rejected count should be ${sim.rejectedCount}`);
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Simulate a rate-limited job runner</h2>
      <p>
        You are given an arrival stream of asynchronous jobs with arrival times (in seconds) and durations (in seconds).
        The runner allows <code>max_concurrent = ${max_concurrent}</code> workers and a queue with capacity
        <code>q_limit = ${q_limit}</code>. When a job arrives and all workers are busy and the queue is full, the job
        is immediately rejected.
      </p>

      <p>Jobs (id, arrival, duration):</p>
      <pre>${JSON.stringify(jobs, null, 2)}</pre>

      <label for="${id}" class="form-label">How many jobs are rejected by this runner?</label>
      <input class="form-control" id="${id}" name="${id}" required />
      <p class="text-muted">Simulate deterministically and submit the rejected job count (integer).</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Note: This deterministic simulation is intended for reasoning about concurrency and queueing behavior. */