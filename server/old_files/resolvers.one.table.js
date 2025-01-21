import { getJobs } from './db/jobs.js';

export const resolvers = {
  Query: {
    greeting: () => 'Hello world greeting',
    jobs: () => getJobs(),
  },
  // field resolvers, to resolve any field of any type

  Job: {
    //if there is a resolver function for a field, it will take precedence
    // title: () => 'Resolved title',
    date: (job) => {
      console.log(job);
      return toIsoDate(job.createdAt);
    },
  },
};

const toIsoDate = (value) => {
  return value.slice(0, 'yyyy-mm-dd'.length);
};
