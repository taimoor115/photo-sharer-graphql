export const typeDefs = `#graphql

    type Post {
        id: ID!
        caption: String!
        imageUrl: String!
        author: [User]!
        createdAt: String!
        updatedAt: String!
    }

`