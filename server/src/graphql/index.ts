import { ApolloServer } from "@apollo/server";
import { User } from "./users/index.js";

async function startGQLServer() {

    const server = new ApolloServer({
        typeDefs: `
            ${User.typeDefs}
            type Query {
              ${User.queries}
              _empty: String
            }
            type Mutation {
                ${User.mutations}
            }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.Query
            },
            Mutation: {
                ...User.resolvers.Mutation
            }
        },
    })



    await server.start();




    return server;

}


export default startGQLServer   