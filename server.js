const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

// Connection to mongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to db'))
  .catch(err => console.log(err));

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

server.listen().then(({ url }) => console.log(`Server running on ${url}`));
