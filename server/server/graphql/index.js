import {
    GraphQLObjectType,
    GraphQLSchema
  } from 'graphql';

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import { graphAuth } from '../auth/auth.service';

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
  
    //Authenticate endpoint
    _app.use('/graphql', graphAuth);
  
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
            req
        },
        })),
    );

}


module.exports = {init};