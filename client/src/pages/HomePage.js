import { useState, useEffect } from 'react';
import JobList from '../components/JobList';
// import { jobs } from '../lib/fake-data';
// import { getJobs } from '../lib/graphql/queries';
import { useJobs } from '../lib/graphql/hooks';

const JOBS_PER_PAGE = 20;

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { jobs, loading, error } = useJobs(
    JOBS_PER_PAGE,
    (currentPage - 1) * JOBS_PER_PAGE
  );
  // const [jobs, setJobs] = useState([]);

  // console.log('[HomePage] jobs ', jobs);

  // useEffect(() => {
  //   getJobs().then((jobs) => setJobs(jobs));
  // }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="has-text-danger">Data unavailable</div>;
  }
  return (
    <div>
      <h1 className="title">Job Board</h1>
      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </button>
        <span> {currentPage} </span>
        <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
      <JobList jobs={jobs} />
    </div>
  );
};

export default HomePage;
