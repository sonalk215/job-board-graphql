import { getJob, getJobs, getJobsByCompany } from './db/jobs.js';
import { getCompany } from './db/companies.js';

export const resolvers = {
  Query: {
    job: (_root, args) => {
      return getJob(args.id);
    },
    company: (_root, args) => {
      return getCompany(args.id);
    },
    jobs: () => getJobs(),
    greeting: () => 'Hello world greeting',
  },
  // field resolvers, to resolve any field of any type

  Job: {
    //if there is a resolver function for a field, it will take precedence
    // title: () => 'Resolved title',
    date: (job) => {
      console.log(job);
      return toIsoDate(job.createdAt);
    },
    company: (job) => {
      return getCompany(job.companyId);
    },
  },

  Company: {
    jobs: (company) => {
      return getJobsByCompany(company.id);
    },
  },
};

const toIsoDate = (value) => {
  return value.slice(0, 'yyyy-mm-dd'.length);
};
