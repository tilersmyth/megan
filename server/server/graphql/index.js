import {
    GraphQLObjectType,
    GraphQLSchema
  } from 'graphql';

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import mutations from './mutations';
import queries from './queries';
import ctrl from '../controllers';


const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields:queries
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: mutations
    })
});

function init(_app, bodyParser, config) {

    // GraphQL authentication middleware
    const addUser = async (req) => {
        const token = req.headers.authorization;
        try {
        const { user } = await jwt.verify(token, config.jwtSecret);
        req.user = user;
        } catch (err) {
        console.log(err);
        }
        req.next();
    };
  
    _app.use(addUser);
  
    // GraphiQL, a visual editor for queries
    _app.use(
        '/graphiql',
        graphiqlExpress({
        endpointURL: '/graphql',
        }),
    );
    
    // GraphQL setup
    _app.use(
        '/graphql',
        bodyParser.json(),
        graphqlExpress(req => ({
        schema,
        context: {
            ctrl,
            config,
            user: req.user,
        },
        })),
    );

}


module.exports = {init};