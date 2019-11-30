const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const schema = require('./schema');
const Query = require('./resolvers/Query');
const app = express();

const executableSchema = buildSchema(schema);

const be_url = 'https://graphql-api-challenge.herokuapp.com';
const port = process.env.PORT || 4000;

const resolvers = { ...Query }

app.get('/', (req, res) => 
{
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.end(`
		<h1>Hello</h1>
		<p>
			Welcome to the GraphQL API for calculating the price of Bitcoin in Nigerian Naira. To use, visit 
			<a href="${be_url}/graphql">${be_url}/graphql</a>
		</p>
	`);
});

app.use('/graphql', graphqlHTTP({
	schema: executableSchema,
	rootValue: resolvers,
	graphiql: true
}))


app.listen(port, () => console.log(`server started on ${be_url}:${port}/graphql`));
