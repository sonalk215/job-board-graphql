import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import { authMiddleware, handleLogin } from './auth.js';
import { readFile } from 'node:fs/promises';
import { resolvers } from './resolvers.js';
import { getUser } from './db/users.js';
import { createCompanyLoader } from './db/companies.js';

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post('/login', handleLogin);

const typeDefs = await readFile('./schema.graphql', 'utf-8');

const getContext = async ({ req }) => {
  const companyLoader = createCompanyLoader();
  const context = { companyLoader };
  if (req.auth) {
    const user = await getUser(req.auth.sub);
    return { user };
  }
  // console.log('express req  ', req.body);
  // console.log('express req auth  ', req.auth);
  // return { text: 'literally any text' };
  return {};
};

const apolloServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
await apolloServer.start();
app.use('/graphql', apolloMiddleware(apolloServer, { context: getContext }));

app.listen({ port: PORT }, () => {
  console.log(`Server running on ${PORT}`);
  console.log(`GraphQL url: http://localhost:${PORT}/graphql`);
});
