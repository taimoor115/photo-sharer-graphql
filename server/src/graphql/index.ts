import { ApolloServer } from "@apollo/server";
import { User } from "./users/index.js";
import { Post } from "./posts/index.js";

async function startGQLServer() {

    const server = new ApolloServer({
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
        `,
        resolvers: {
            Query: {
                ...User.resolvers.Query,
                ...Post.resolvers.Query
            },
            Mutation: {
                ...User.resolvers.Mutation,
                ...Post.resolvers.Mutation
            },
            ...User.resolvers.ExtraResolvers
        },
    })



    await server.start();




    return server;

}


export default startGQLServer   