import { createJob, getJob, getJobs, getJobsByCompany } from './db/jobs.js';
import { getCompany } from './db/companies.js';
import { GraphQLError } from 'graphql';

export const resolvers = {
  Query: {
    job: async (_root, args) => {
      const job = await getJob(args.id);
      if (!job) {
        throw notFoundError('No Job found with id ' + args.id);
      }
      return job;
    },
    company: async (_root, args) => {
      const company = await getCompany(args.id);
      if (!company) {
        throw notFoundError('No company found with id ' + args.id);
      }
      return company;
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

  // mutation type-----
  Mutation: {
    createJob: (_root, args) => {
      // console.log('------', args);
      const companyId = 'FjcJCHJALA4i';
      const { title, description } = args;
      return createJob({ companyId, title, description });
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

const notFoundError = (message) => {
  return new GraphQLError(message, {
    extensions: { code: 'NOT_FOUND' },
  });
};
