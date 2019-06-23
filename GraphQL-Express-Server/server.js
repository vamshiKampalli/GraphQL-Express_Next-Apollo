const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const fs = require('fs');


const port = process.env.PORT || 9000;
const app = express();


const typeDefs = fs.readFileSync('./schema/schema.graphql',{encoding:'utf-8'})
const resolvers = require('./resolvers/resolver')

const {makeExecutableSchema} = require('graphql-tools')
const schema = makeExecutableSchema({typeDefs, resolvers})

app.use(cors(), bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));
app.listen(
   port, () => console.info(
      `Server started on port ${port}`
   )
);