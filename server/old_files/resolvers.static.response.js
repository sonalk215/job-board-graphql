export const resolvers = {
  Query: {
    greeting: () => 'Hello world greeting',
    jobs: async () => {
      return [
        {
          id: 'Job id',
          title: 'Job title',
          description: 'Job description',
        },
      ];
    },
  },
};
