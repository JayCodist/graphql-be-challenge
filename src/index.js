const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const schema = require('./schema');
const Query = require('./resolvers/Query');
const app = express();

const executableSchema = buildSchema(schema);

const be_url = process.env.HOST || 'http://localhost';
const port = process.env.PORT || 4000;

const resolvers = { ...Query }

app.use('/graphql', graphqlHTTP({
	schema: executableSchema,
	rootValue: resolvers,
	graphiql: true
}))


app.listen(port, () => console.log(`server started on ${be_url}:${port}/graphql`));
