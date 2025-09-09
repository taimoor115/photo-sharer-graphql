import { ApolloServer } from "@apollo/server";

async function startGQLServer() {

    const server = new ApolloServer({
        typeDefs: `
            ${User.typeDefs}
            type Query {
                ${User.queries}
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