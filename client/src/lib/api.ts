export async function fetchJobs() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`);
  if (!response.ok) throw new Error("Failed to fetch jobs");
  return response.json();
}
