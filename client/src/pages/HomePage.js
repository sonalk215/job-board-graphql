// import { useState, useEffect } from 'react';
import JobList from '../components/JobList';
// import { jobs } from '../lib/fake-data';
// import { getJobs } from '../lib/graphql/queries';
import { useJobs } from '../lib/graphql/hooks';

const HomePage = () => {
  const { jobs, loading, error } = useJobs();
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
      <JobList jobs={jobs} />
    </div>
  );
};

export default HomePage;
