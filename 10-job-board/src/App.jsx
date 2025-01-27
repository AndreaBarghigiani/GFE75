import { useState, useEffect } from 'react';

const BASE_PATH = 'https://hacker-news.firebaseio.com/v0';
const JOB_PER_PAGE = 6;

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [jobIDs, setJobIDs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [fetchedJobs, setFetchedJobs] = useState([]);

  // Only load IDs on first render
  useEffect(() => {
    fetchJobIDs();
  }, []);

  // Load jobs on page change
  useEffect(() => {
    fetchJobs();
  }, [jobIDs, currentPage]);

  async function fetchJobIDs() {
    setIsLoading(true);

    const res = await fetch(`${BASE_PATH}/jobstories.json`);
    const ids = await res.json();
    setJobIDs(ids);
    setIsLoading(false);
  }

  async function fetchJobs() {
    if (jobIDs === null || jobIDs.length === 0) return;

    setIsLoading(true);

    const nextJobIds = jobIDs.slice(
      currentPage * JOB_PER_PAGE,
      (currentPage + 1) * JOB_PER_PAGE,
    );

    const promises = nextJobIds.map((id) => {
      if (id === null) Promise.resolve(null);

      return fetch(`${BASE_PATH}/item/${id}.json`).then((res) => res.json());
    });

    const jobs = await Promise.all(promises);
    const validJobs = jobs.filter((job) => job !== null);
    const mergedJobs = [...fetchedJobs, ...validJobs];
    setFetchedJobs(mergedJobs);
    setIsLoading(false);
  }
  return (
    <main className="container mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-orange-500">
        Hacker News Job Board
      </h1>
      {isLoading && fetchedJobs.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {fetchedJobs.map((job) => (
            <JobBox key={job.id} job={job} />
          ))}
        </ul>
      )}

      {jobIDs.length > fetchedJobs.length && (
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="p-2 bg-orange-500 text-white rounded"
        >
          {isLoading ? 'Loading...' : 'Load more jobs'}
        </button>
      )}
    </main>
  );
}

const JobBox = ({ job }) => (
  <li key={job.id} className="border p-2 mb-2 bg-slate-100 hover:bg-slate-200">
    <h3 className="font-medium">
      {job.url !== '' ? <a href={job.url}>{job.title}</a> : job.title}
    </h3>

    <p className="text-sm text-slate-700">
      By {job.by} on {new Date(job.time * 1000).toLocaleString()}
    </p>
  </li>
);
