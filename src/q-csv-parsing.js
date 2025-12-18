import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-csv-parsing";
  const title = "Cricket Analysis: Best Team & Player (CSV)";

  const random = seedrandom(`${user.email}#${id}`);
  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;

  // 8 Real Teams, 7 Real Players per team
  const dataset = [
    { 
      team: "India", 
      players: ["Virat Kohli", "Rohit Sharma", "Jasprit Bumrah", "KL Rahul", "Hardik Pandya", "Rishabh Pant", "Ravindra Jadeja"] 
    },
    { 
      team: "Australia", 
      players: ["Steve Smith", "Pat Cummins", "David Warner", "Mitchell Starc", "Glenn Maxwell", "Travis Head", "Marcus Stoinis"] 
    },
    { 
      team: "England", 
      players: ["Joe Root", "Ben Stokes", "Jos Buttler", "Jofra Archer", "Harry Brook", "Liam Livingstone", "Moeen Ali"] 
    },
    { 
      team: "South Africa", 
      players: ["Kagiso Rabada", "Quinton de Kock", "Temba Bavuma", "Aiden Markram", "David Miller", "Heinrich Klaasen", "Marco Jansen"] 
    },
    { 
      team: "New Zealand", 
      players: ["Kane Williamson", "Trent Boult", "Tom Latham", "Daryl Mitchell", "Devon Conway", "Tim Southee", "Mitchell Santner"] 
    },
    { 
      team: "Pakistan", 
      players: ["Babar Azam", "Shaheen Afridi", "Mohammad Rizwan", "Naseem Shah", "Shadab Khan", "Fakhar Zaman", "Haris Rauf"] 
    },
    { 
      team: "West Indies", 
      players: ["Nicholas Pooran", "Jason Holder", "Andre Russell", "Shai Hope", "Alzarri Joseph", "Rovman Powell", "Kyle Mayers"] 
    },
    { 
      team: "Sri Lanka", 
      players: ["Kusal Mendis", "Wanindu Hasaranga", "Dasun Shanaka", "Angelo Mathews", "Maheesh Theekshana", "Pathum Nissanka", "Dushmantha Chameera"] 
    }
  ];

  // Known Power Hitters usually have higher SR
  const powerHitters = new Set([
    "Hardik Pandya", "Rishabh Pant", "Ravindra Jadeja",
    "Glenn Maxwell", "Travis Head", "Marcus Stoinis", "David Warner",
    "Jos Buttler", "Ben Stokes", "Liam Livingstone", "Harry Brook",
    "Heinrich Klaasen", "David Miller", "Quinton de Kock",
    "Andre Russell", "Nicholas Pooran", "Rovman Powell", "Kyle Mayers",
    "Suryakumar Yadav", "Finn Allen", "Tim David"
  ]);

  const data = [];
  dataset.forEach(t => {
    t.players.forEach(p => {
      // Realistic T20 Stats
      // Balls faced: 5 to 40 (Lower variance, realistic innings)
      const balls = randInt(5, 40);
      
      let sr;
      if (powerHitters.has(p)) {
         // Explosive range for stars: 160 - 260
         sr = randInt(160, 260);
      } else {
         // Standard Anchor/Rotator range: 110 - 150
         sr = randInt(110, 150);
      }
      
      // Runs derived from SR
      const runs = Math.floor(balls * (sr / 100));

      data.push({
        name: p,
        team: t.team,
        runs: runs,
        balls: balls
      });
    });
  });

  const csv = "Player,Team,Runs,Balls\n" + data.map(d => `${d.name},${d.team},${d.runs},${d.balls}`).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });

  // Logic 1: Best Team SR
  const teamStats = {};
  data.forEach(d => {
    if(!teamStats[d.team]) teamStats[d.team] = { runs: 0, balls: 0 };
    teamStats[d.team].runs += d.runs;
    teamStats[d.team].balls += d.balls;
  });

  let maxTeamSR = -1;
  let bestTeam = "";
  Object.entries(teamStats).forEach(([team, stats]) => {
    const sr = (stats.runs / stats.balls) * 100;
    if(sr > maxTeamSR) {
      maxTeamSR = sr;
      bestTeam = team;
    }
  });

  // Logic 2: Best Player SR
  let maxPlayerSR = -1;
  let bestPlayer = "";
  data.forEach(d => {
    const sr = (d.runs / d.balls) * 100;
    if(sr > maxPlayerSR) {
      maxPlayerSR = sr;
      bestPlayer = d.name;
    }
  });

  const expected = {
    team: bestTeam,
    player: bestPlayer
  };

  const answer = (input) => { 
    try {
      // Relaxed JSON parse: allow single quotes (Python style)
      const sanitized = input.replace(/'/g, '"');
      const userAns = JSON.parse(sanitized);
      // Case-insensitive check
      return userAns.team.trim().toLowerCase() === expected.team.toLowerCase() &&
             userAns.player.trim().toLowerCase() === expected.player.toLowerCase();
    } catch(e) { return false; }
  }

  const question = html`
    <div class="mb-3">
      <h4>Case Study: Cricket Performance Analysis</h4>
      <p>
        In T20 Cricket, <strong>Strike Rate (SR)</strong> is the gold standard for aggression. 
        As the Lead Analyst for the league, you need to identify the most aggressive <strong>Team</strong> and the most explosive <strong>Player</strong> from the match data.
      </p>

      <div style="background: #1e1e1e; padding: 15px; border-radius: 8px; font-family: 'Consolas', 'Monaco', monospace; font-size: 0.9em; box-shadow: 0 4px 6px rgba(0,0,0,0.3); margin-bottom: 20px; overflow-x: auto; line-height: 1.5;">
        <div style="color: #6a9955; font-weight: bold; margin-bottom: 5px;">// Sample Data Preview</div>
        ${csv.split('\n').slice(0, 4).map(line => {
          const cells = line.split(',');
          // Colors: Blue (Player), Red/Orange (Team), Green (Runs), Purple (Balls)
          const colors = ['#569cd6', '#ce9178', '#b5cea8', '#c586c0'];
          return html`<div style="white-space: nowrap; margin: 0;">${cells.map((cell, i) => html`<span style="color: ${colors[i % colors.length]}">${cell}</span>${i < cells.length - 1 ? html`<span style="color: #808080">,</span>` : ''}`)}</div>`;
        })}
        <div style="color: #6a9955">...</div>
      </div>
      
      <h3>Task</h3>
      <ol>
        <li>Download the CSV file below.</li>
        <li>Calculate <strong>Strike Rate</strong> (SR) = <code>(Runs / Balls) * 100</code> for each player.</li>
        <li>Identify the <strong>Team</strong> with the Highest Average SR (Total Team Runs / Total Team Balls).</li>
        <li>Identify the <strong>Player</strong> with the Highest Individual SR.</li>
        <li>Return a JSON object: <code>{"team": "TeamName", "player": "PlayerName"}</code></li>
      </ol>

      <p>
        Download Data:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <label for="${id}" class="form-label">Answer (JSON):</label>
      <input type="text" class="form-control" name="${id}" id="${id}">
    </div>
  `;

  return { id, title, weight, question, answer };
}

/*
  Python Solution:

  import pandas as pd
  import json

  # 1. Load Data
  df = pd.read_csv("q-csv-parsing.csv")

  # 2. Calculate Team SR
  # sort=False matches JS logic (insertion order) for tie-breaking
  team_stats = df.groupby("Team", sort=False)[["Runs", "Balls"]].sum()
  team_stats["SR"] = (team_stats["Runs"] / team_stats["Balls"]) * 100
  best_team = team_stats["SR"].idxmax()

  # 3. Calculate Player SR
  df["SR"] = (df["Runs"] / df["Balls"]) * 100
  best_player = df.loc[df["SR"].idxmax(), "Player"]

  # 4. Result (JSON)
  print(json.dumps({"team": best_team, "player": best_player}))
*/
