const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const { findOrCreateUser } = require('./controllers/userController');

// Connection to mongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to db'))
  .catch(err => console.log(err));

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      if (authToken) {
        currentUser = await findOrCreateUser(authToken);
      }
    } catch (err) {
      console.error(`Unable to authenticate user with token ${authToken}`);
    }
    return { currentUser };
  },
});

server.listen().then(({ url }) => console.log(`Server running on ${url}`));
