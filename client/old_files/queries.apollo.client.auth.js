import {
  ApolloClient,
  createHttpLink,
  gql,
  InMemoryCache,
} from '@apollo/client';
// import { GraphQLClient, gql } from 'graphql-request';
import { GraphQLClient } from 'graphql-request';
import { getAccessToken } from '../auth';

// const client = new GraphQLClient('http://localhost:9000/graphql', {
//   headers: () => {
//     const accessToken = getAccessToken();
//     if (accessToken) {
//       return {
//         Authorization: `Bearer ${accessToken}`,
//       };
//     }
//     return {};
//   },
// });

const httpLink = createHttpLink({
  uri: 'http://localhost:9000/graphql',
});

const apolloClient = new ApolloClient({
  uri: 'http://localhost:9000/graphql',
  cache: new InMemoryCache(),
});

export const createJob = async ({ title, description }) => {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
      }
    }
  `;

  //------use GraphQL client
  // const data = await client.request(mutation, {
  //   input: { title, description },
  // });
  // return data.job;

  //------use Apollo client
  const { data } = await apolloClient.mutate(mutation, {
    variables: { input: { title, description } },
  });
  return data.job;
};

export const getJobs = async () => {
  const query = gql`
    query {
      jobs {
        id
        date
        title
        company {
          id
          name
        }
      }
    }
  `;
  //------use GraphQL client
  // const data = await client.request(query);
  // return data.jobs;

  //------use Apollo client
  const result = await apolloClient.query({ query });
  return result.data.jobs;
};

export const getJob = async (id) => {
  const query = gql`
    query JobById($id: ID!) {
      job(id: $id) {
        id
        date
        title
        company {
          id
          name
        }
        description
      }
    }
  `;
  //------use GraphQL client
  // const data = await client.request(query, { id });
  // return data.job;

  //------use Apollo client
  const { data } = await apolloClient.query({ query, variables: { id } });
  return data.job;
};

export const getCompany = async (id) => {
  const query = gql`
    query CompanyById($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          date
          title
        }
      }
    }
  `;
  //------use GraphQL client
  // const { company } = await client.request(query, { id });
  // return company;

  //------use Apollo client
  const { data } = await apolloClient.query({ query, variables: { id } });
  return data.company;
};