export const resolvers = {
  Query: {
    greeting: () => 'Hello world greeting',
    job: () => {
      return {
        title: 'Job title',
        description: 'Job description',
      };
    },
  },
};
