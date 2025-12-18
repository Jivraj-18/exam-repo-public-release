export default async function question({ user, weight = 1 }) {
  return {
    id: "q-workers-kv",
    title: "Cloudflare Workers KV Cache",
    weight,
    answer: null, // Accept any non-empty answer
  };
}