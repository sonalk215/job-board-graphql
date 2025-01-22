import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('http://localhost:9000/graphql');

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
  const data = await client.request(query);
  return data.jobs;
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
  const data = await client.request(query, { id });
  return data.job;
};

export const getCompany = async (id) => {
  const query = gql`
    query CompanyById($id: ID!) {
      company(id: $id) {
        id
        name
        description
      }
    }
  `;
  const { company } = await client.request(query, { id });
  return company;
};
