import { useEffect, useState } from "react";
import { fetchJobs } from "@/lib/api"; // thanks to path alias `@`

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs()
      .then(setJobs)
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div>
      <h1>Jobs</h1>
      <ul>
        {jobs.map((job: any) => (
          <li key={job.id}>{job.title}</li>
        ))}
      </ul>
    </div>
  );
}
