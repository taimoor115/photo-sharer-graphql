import { ApolloServer } from "@apollo/server";
import { User } from "./users/index.js";
import { Post } from "./posts/index.js";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { GraphQLSchema } from 'graphql';
let schema: GraphQLSchema;
async function startGQLServer() {

    schema = makeExecutableSchema({
        typeDefs: `
        ${User.typeDefs}
        ${Post.typeDefs}
        type Query {
        ${User.queries}
        ${Post.queries}
        }
        type Mutation {
        ${User.mutations}
        ${Post.mutations}
        }
        type Subscription {
        newPost: Post!
        }
  `,
        resolvers: {
            Query: {
                ...User.resolvers.Query,
                ...Post.resolvers.Query,
            },
            Mutation: {
                ...User.resolvers.Mutation,
                ...Post.resolvers.Mutation,
            },
            Subscription: {
                ...Post.resolvers.Subscription,
            },
            ...User.resolvers.ExtraResolvers,
        },
    });
    const server = new ApolloServer({
        schema
    })



    await server.start();




    return server;

}


export default startGQLServer;
export { schema }; 