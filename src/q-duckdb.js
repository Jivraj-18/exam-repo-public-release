import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { pick } from "./utils/random.js";

const orders = [
  { "id": 1, "month": "2024-01", "amount": 2106 },
  { "id": 2, "month": "2024-01", "amount": 2465 },
  { "id": 3, "month": "2024-01", "amount": 3814 },
  { "id": 4, "month": "2024-01", "amount": 1443 },
  { "id": 5, "month": "2024-01", "amount": 655 },
  { "id": 6, "month": "2024-01", "amount": 2470 },
  { "id": 7, "month": "2024-01", "amount": 2925 },
  { "id": 8, "month": "2024-01", "amount": 764 },
  { "id": 9, "month": "2024-01", "amount": 4663 },
  { "id": 10, "month": "2024-01", "amount": 2775 },
  { "id": 11, "month": "2024-01", "amount": 1657 },
  { "id": 12, "month": "2024-01", "amount": 3061 },
  { "id": 13, "month": "2024-01", "amount": 3009 },
  { "id": 14, "month": "2024-02", "amount": 2150 },
  { "id": 15, "month": "2024-02", "amount": 4461 },
  { "id": 16, "month": "2024-02", "amount": 2908 },
  { "id": 17, "month": "2024-02", "amount": 2596 },
  { "id": 18, "month": "2024-02", "amount": 527 },
  { "id": 19, "month": "2024-02", "amount": 762 },
  { "id": 20, "month": "2024-02", "amount": 819 },
  { "id": 21, "month": "2024-02", "amount": 4387 },
  { "id": 22, "month": "2024-02", "amount": 1824 },
  { "id": 23, "month": "2024-03", "amount": 3352 },
  { "id": 24, "month": "2024-03", "amount": 4641 },
  { "id": 25, "month": "2024-03", "amount": 3639 },
  { "id": 26, "month": "2024-03", "amount": 3311 },
  { "id": 27, "month": "2024-03", "amount": 4278 },
  { "id": 28, "month": "2024-03", "amount": 3509 },
  { "id": 29, "month": "2024-03", "amount": 4543 },
  { "id": 30, "month": "2024-03", "amount": 2726 },
  { "id": 31, "month": "2024-03", "amount": 502 },
  { "id": 32, "month": "2024-03", "amount": 4525 },
  { "id": 33, "month": "2024-03", "amount": 2420 },
  { "id": 34, "month": "2024-04", "amount": 1822 },
  { "id": 35, "month": "2024-04", "amount": 2901 },
  { "id": 36, "month": "2024-04", "amount": 4985 },
  { "id": 37, "month": "2024-04", "amount": 4416 },
  { "id": 38, "month": "2024-04", "amount": 3681 },
  { "id": 39, "month": "2024-04", "amount": 4541 },
  { "id": 40, "month": "2024-05", "amount": 842 },
  { "id": 41, "month": "2024-05", "amount": 3422 },
  { "id": 42, "month": "2024-05", "amount": 2374 },
  { "id": 43, "month": "2024-05", "amount": 2538 },
  { "id": 44, "month": "2024-05", "amount": 4291 },
  { "id": 45, "month": "2024-05", "amount": 2202 },
  { "id": 46, "month": "2024-06", "amount": 1555 },
  { "id": 47, "month": "2024-06", "amount": 761 },
  { "id": 48, "month": "2024-06", "amount": 1609 },
  { "id": 49, "month": "2024-06", "amount": 2261 },
  { "id": 50, "month": "2024-06", "amount": 1242 },
  { "id": 51, "month": "2024-06", "amount": 4757 },
  { "id": 52, "month": "2024-06", "amount": 3035 },
  { "id": 53, "month": "2024-07", "amount": 1057 },
  { "id": 54, "month": "2024-07", "amount": 3683 },
  { "id": 55, "month": "2024-07", "amount": 1703 },
  { "id": 56, "month": "2024-07", "amount": 4839 },
  { "id": 57, "month": "2024-07", "amount": 3429 },
  { "id": 58, "month": "2024-07", "amount": 2574 },
  { "id": 59, "month": "2024-07", "amount": 3553 },
  { "id": 60, "month": "2024-07", "amount": 3050 },
  { "id": 61, "month": "2024-07", "amount": 1104 },
  { "id": 62, "month": "2024-08", "amount": 4466 },
  { "id": 63, "month": "2024-08", "amount": 2419 },
  { "id": 64, "month": "2024-08", "amount": 3054 },
  { "id": 65, "month": "2024-08", "amount": 4893 },
  { "id": 66, "month": "2024-08", "amount": 1467 },
  { "id": 67, "month": "2024-08", "amount": 1758 },
  { "id": 68, "month": "2024-08", "amount": 4659 },
  { "id": 69, "month": "2024-08", "amount": 706 },
  { "id": 70, "month": "2024-09", "amount": 1324 },
  { "id": 71, "month": "2024-09", "amount": 1943 },
  { "id": 72, "month": "2024-09", "amount": 3311 },
  { "id": 73, "month": "2024-09", "amount": 504 },
  { "id": 74, "month": "2024-09", "amount": 2527 },
  { "id": 75, "month": "2024-09", "amount": 4402 },
  { "id": 76, "month": "2024-09", "amount": 1210 },
  { "id": 77, "month": "2024-09", "amount": 1052 },
  { "id": 78, "month": "2024-09", "amount": 672 },
  { "id": 79, "month": "2024-09", "amount": 1476 },
  { "id": 80, "month": "2024-10", "amount": 1939 },
  { "id": 81, "month": "2024-10", "amount": 4861 },
  { "id": 82, "month": "2024-10", "amount": 3622 },
  { "id": 83, "month": "2024-10", "amount": 665 },
  { "id": 84, "month": "2024-10", "amount": 4932 },
  { "id": 85, "month": "2024-10", "amount": 4506 },
  { "id": 86, "month": "2024-10", "amount": 4784 },
  { "id": 87, "month": "2024-10", "amount": 1958 },
  { "id": 88, "month": "2024-11", "amount": 3289 },
  { "id": 89, "month": "2024-11", "amount": 1243 },
  { "id": 90, "month": "2024-11", "amount": 3285 },
  { "id": 91, "month": "2024-11", "amount": 3016 },
  { "id": 92, "month": "2024-11", "amount": 1975 },
  { "id": 93, "month": "2024-11", "amount": 2368 },
  { "id": 94, "month": "2024-12", "amount": 1663 },
  { "id": 95, "month": "2024-12", "amount": 2528 },
  { "id": 96, "month": "2024-12", "amount": 2199 },
  { "id": 97, "month": "2024-12", "amount": 2429 },
  { "id": 98, "month": "2024-12", "amount": 501 },
  { "id": 99, "month": "2024-12", "amount": 3303 },
  { "id": 100, "month": "2024-12", "amount": 4239 }
];

const tasks = [
  (random) => {
    const min = Math.floor(random() * 1000) + 1000;
    const result = orders
      .filter((o) => o.amount >= min)
      .reduce((s, o) => s + o.amount, 0);

    return {
      id: `sql-sum-${min}`,
      description: `Write a SQL query to compute the total order amount where amount >= ${min}.`,
      validate: (out) => {
        if (!out.includes(String(result))) {
          throw new Error(`Incorrect`);
        }
      },
      summary: `total amount >= ${min}`,
    };
  },
];

export default async function ({ user, weight = 2 }) {
  const id = "q-sql-with-data";
  const title = "SQL Aggregation with Embedded Data";
  const random = seedrandom(`${user.email}#${id}`);
  const task = pick(tasks, random)(random);

  const question = html`
    <div class="mb-3">
      <h4>Case Study: SQL Revenue Analysis</h4>
      <p>Given the following <code>orders</code> table:</p>
      <pre><code>
id | month     | amount
1  | 2024-01   | 2106
2  | 2024-01   | 2465
3  | 2024-01   | 3814
4  | 2024-01   | 1443
5  | 2024-01   | 655
6  | 2024-01   | 2470
7  | 2024-01   | 2925
8  | 2024-01   | 764
9  | 2024-01   | 4663
10 | 2024-01   | 2775
11 | 2024-01   | 1657
12 | 2024-01   | 3061
13 | 2024-01   | 3009
14 | 2024-02   | 2150
15 | 2024-02   | 4461
16 | 2024-02   | 2908
17 | 2024-02   | 2596
18 | 2024-02   | 527
19 | 2024-02   | 762
20 | 2024-02   | 819
21 | 2024-02   | 4387
22 | 2024-02   | 1824
23 | 2024-03   | 3352
24 | 2024-03   | 4641
25 | 2024-03   | 3639
26 | 2024-03   | 3311
27 | 2024-03   | 4278
28 | 2024-03   | 3509
29 | 2024-03   | 4543
30 | 2024-03   | 2726
31 | 2024-03   | 502
32 | 2024-03   | 4525
33 | 2024-03   | 2420
34 | 2024-04   | 1822
35 | 2024-04   | 2901
36 | 2024-04   | 4985
37 | 2024-04   | 4416
38 | 2024-04   | 3681
39 | 2024-04   | 4541
40 | 2024-05   | 842
41 | 2024-05   | 3422
42 | 2024-05   | 2374
43 | 2024-05   | 2538
44 | 2024-05   | 4291
45 | 2024-05   | 2202
46 | 2024-06   | 1555
47 | 2024-06   | 761
48 | 2024-06   | 1609
49 | 2024-06   | 2261
50 | 2024-06   | 1242
51 | 2024-06   | 4757
52 | 2024-06   | 3035
53 | 2024-07   | 1057
54 | 2024-07   | 3683
55 | 2024-07   | 1703
56 | 2024-07   | 4839
57 | 2024-07   | 3429
58 | 2024-07   | 2574
59 | 2024-07   | 3553
60 | 2024-07   | 3050
61 | 2024-07   | 1104
62 | 2024-08   | 4466
63 | 2024-08   | 2419
64 | 2024-08   | 3054
65 | 2024-08   | 4893
66 | 2024-08   | 1467
67 | 2024-08   | 1758
68 | 2024-08   | 4659
69 | 2024-08   | 706
70 | 2024-09   | 1324
71 | 2024-09   | 1943
72 | 2024-09   | 3311
73 | 2024-09   | 504
74 | 2024-09   | 2527
75 | 2024-09   | 4402
76 | 2024-09   | 1210
77 | 2024-09   | 1052
78 | 2024-09   | 672
79 | 2024-09   | 1476
80 | 2024-10   | 1939
81 | 2024-10   | 4861
82 | 2024-10   | 3622
83 | 2024-10   | 665
84 | 2024-10   | 4932
85 | 2024-10   | 4506
86 | 2024-10   | 4784
87 | 2024-10   | 1958
88 | 2024-11   | 3289
89 | 2024-11   | 1243
90 | 2024-11   | 3285
91 | 2024-11   | 3016
92 | 2024-11   | 1975
93 | 2024-11   | 2368
94 | 2024-12   | 1663
95 | 2024-12   | 2528
96 | 2024-12   | 2199
97 | 2024-12   | 2429
98 | 2024-12   | 501
99 | 2024-12   | 3303
100| 2024-12   | 4239
      </code></pre>
      <p><code>${task.description}</code></p>

      <label class="form-label" for="${id}">Paste your SQL output</label>
      <textarea id="${id}" name="${id}" class="form-control" rows="4"></textarea>
    </div>
  `;

  const answer = async (output) => {
    if (!output) throw new Error("Output required");
    task.validate(String(output));
    return true;
  };

  return { id, title, weight, question, answer };
}
