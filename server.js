const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./operations/rootQuery');

const app = express();
const port = 4000;

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
