export default function ({ user, weight }) {
  return {
    id: "q-24f2004829-2",
    title: "Average temperature per city",
    weight,
    statement: `
You are given an array of readings. Each reading has a city name and its temperature in Celsius.

Implement the function averageTemperaturePerCity(readings) that returns an object mapping each city name to its average temperature.

Example:
Input:
[
  { city: "Chennai", temp: 30 },
  { city: "Delhi", temp: 25 },
  { city: "Chennai", temp: 32 }
]

Output:
{ Chennai: 31, Delhi: 25 }
`,
    starterCode: `
function averageTemperaturePerCity(readings) {
  // TODO: Write your code here
}

module.exports = averageTemperaturePerCity;
`,
    tests: [
      {
        name: "simple case",
        input: [
          [
            { city: "Chennai", temp: 30 },
            { city: "Delhi", temp: 25 },
            { city: "Chennai", temp: 32 },
          ],
        ],
        expected: { Chennai: 31, Delhi: 25 },
      },
      {
        name: "single city",
        input: [
          [
            { city: "Mumbai", temp: 28 },
            { city: "Mumbai", temp: 30 },
            { city: "Mumbai", temp: 34 },
          ],
        ],
        expected: { Mumbai: 30.6666666667 },
      },
      {
        name: "empty array",
        input: [[]],
        expected: {},
      },
    ],
  };
}
