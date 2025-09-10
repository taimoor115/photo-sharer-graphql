export const typeDefs = `#graphql


 input CreatePostData {
        caption: String
        imageUrl: String!
    }
    type Post {
        id: ID!
        caption: String
        imageUrl: String!
        author: [User]!
        createdAt: String!
        updatedAt: String!
    }

`