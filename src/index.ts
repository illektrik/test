import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import resolvers from './resolvers'
import express = require('express');

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma,
  }),
});
server.express.use('/images', express.static("images"));
server.start(() => console.log(`Server is running on http://localhost:4000`));
