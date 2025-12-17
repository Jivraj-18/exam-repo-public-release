export default function ({ user, weight = 1 }) {
  return {
    id: "critical_hub_identification",
    title: "Geospatial + Network Analysis: Critical Hub Identification",
    question: `
RapidLink operates emergency logistics hubs connected by travel-time routes.

A hub is **critical** if:
- It has high betweenness centrality
- AND removing it increases average shortest-path distance by **≥ 20%**

### Dataset
- from_hub
- to_hub
- travel_minutes

### Task (Python + NetworkX)

1. Build a weighted undirected graph
2. Compute betweenness centrality
3. Identify top 3 hubs
4. Remove each hub one at a time
5. Recompute average shortest path length
6. Identify the **single most critical hub**

### Deliverable
Enter the **hub ID only**.
    `,
    answer: "H17",
    weight,
  };
}
