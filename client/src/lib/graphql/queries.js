import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  gql,
  InMemoryCache,
} from '@apollo/client';
import { getAccessToken } from '../auth';

const httpLink = createHttpLink({
  uri: 'http://localhost:9000/graphql',
});

const authLink = new ApolloLink((operation, forward) => {
  // console.log('[customLink] operation  ', operation);
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
  // for all the queries to always make fresh server connection request
  // defaultOptions: {
  //   query: {
  //     fetchPolicy: 'network-only'
  //   }
  // }
});

const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    date
    title
    company {
      id
      name
    }
    description
  }
`;

export const jobByIdQuery = gql`
  query JobById($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

export const jobsQuery = gql`
  query Jobs($limit: Int, $offset: Int) {
    jobs(limit: $limit, offset: $offset) {
      items {
        id
        date
        title
        company {
          id
          name
        }
      }
      totalCount
    }
  }
`;

export const companyByIdQuery = gql`
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

export const createJobMutation = gql`
  mutation CreateJob($input: CreateJobInput!) {
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

// export const createJob = async ({ title, description }) => {
//   const mutation = gql`
//     mutation CreateJob($input: CreateJobInput!) {
//       job: createJob(input: $input) {
//         ...JobDetail
//       }
//     }
//     ${jobDetailFragment}
//   `;

//   //------use Apollo client
//   const { data } = await apolloClient.mutate({
//     mutation,
//     variables: { input: { title, description } },
//     //to write the above mutation result in cache
//     update: (cache, { data }) => {
//       // console.log('result     ', data);
//       cache.writeQuery({
//         query: jobByIdQuery,
//         variables: { id: data.job.id },
//         data,
//       });
//     },
//   });
//   return data.job;
// };

// export const getJobs = async () => {
//   const query = gql`
//     query Jobs {
//       jobs {
//         id
//         date
//         title
//         company {
//           id
//           name
//         }
//       }
//     }
//   `;
//   //------use Apollo client
//   const result = await apolloClient.query({
//     query,
//     fetchPolicy: 'network-only',
//   });
//   return result.data.jobs;
// };

//not required anymore because using hooks
// export const getJob = async (id) => {
//   //------use GraphQL client
//   // const data = await client.request(query, { id });
//   // return data.job;

//   //------use Apollo client
//   const { data } = await apolloClient.query({
//     query: jobByIdQuery,
//     variables: { id },
//   });
//   return data.job;
// };

// no longer used as we are using useQuery hook
// export const getCompany = async (id) => {
//   const query = gql`
//     query CompanyById($id: ID!) {
//       company(id: $id) {
//         id
//         name
//         description
//         jobs {
//           id
//           date
//           title
//         }
//       }
//     }
//   `;
//   //------use GraphQL client
//   // const { company } = await client.request(query, { id });
//   // return company;

//   //------use Apollo client
//   const { data } = await apolloClient.query({ query, variables: { id } });
//   return data.company;
// };
