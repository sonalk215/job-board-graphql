import { getJobs } from './db/jobs.js';

export const resolvers = {
  Query: {
    greeting: () => 'Hello world greeting',
    jobs: () => getJobs(),
  },
  // field resolvers, to resolve any field of any type
  Job: {
    date: (job) => {
      console.log(job);
      return toIsoDate(job.createdAt);
    },
  },
};

const toIsoDate = (value) => {
  return value.slice(0, 'yyyy-mm-dd'.length);
};
