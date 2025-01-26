import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  getJobsByCompany,
  updateJob,
} from './db/jobs.js';
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
      // console.log(job);
      return toIsoDate(job.createdAt);
    },
    company: (job, _args, { companyLoader }) => {
      return companyLoader.load(job.companyId);
      // return getCompany(job.companyId);
    },
  },

  Mutation: {
    createJob: (_root, { input: { title, description } }, { user }) => {
      if (!user) {
        throw unauthorizedError('Missing authentiction');
      }
      console.log('create job user  ', user);
      const companyId = user.companyId;
      return createJob({ companyId, title, description });
    },
    deleteJob: async (_root, { id }, { user }) => {
      if (!user) {
        throw unauthorizedError('Missing authentiction');
      }
      const job = await deleteJob(id, user.companyId);
      if (!job) {
        throw notFoundError('No job found with id ' + id);
      }
      return job;
    },
    updateJob: async (
      _root,
      { input: { id, title, description } },
      { user }
    ) => {
      if (!user) {
        throw unauthorizedError('Missing authentiction');
      }
      const job = await updateJob({
        id,
        companyId: user.companyId,
        title,
        description,
      });
      if (!job) {
        throw notFoundError('No job found with id ' + id);
      }
      return job;
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

const unauthorizedError = (message) => {
  return new GraphQLError(message, {
    extensions: { code: 'UNAUTHORIZED' },
  });
};
