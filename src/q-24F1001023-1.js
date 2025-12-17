export default function({ user, weight }) {
  return {
    id: "q-24F1001023-1",
    type: "mcq",
    text: "You need to download a file from `https://example.com/data.csv` and save it as `source_data.csv` using the command line. Which command achieves this?",
    options: [
      "curl https://example.com/data.csv",
      "wget https://example.com/data.csv -O source_data.csv",
      "get https://example.com/data.csv > source_data.csv",
      "fetch -url https://example.com/data.csv -save source_data.csv"
    ],
    answer: "wget https://example.com/data.csv -O source_data.csv",
    weight: weight
  }
}