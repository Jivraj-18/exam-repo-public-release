export default function ({ weight = 1 }) {
  return {
    id: "json_temperature_normalisation",
    weight,
    question: `
A JSONL file contains sensor readings.
Some temperatures are in Fahrenheit, others in Celsius.

You want to:
- Stream the file without loading it fully into memory
- Convert all values to Celsius
- Compute an average

Which Python library is MOST suitable for streaming large JSON files?
`,
    answer: "ijson",
  };
}
