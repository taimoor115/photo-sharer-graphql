export const typeDefs = `

    type User {
        id: ID!
        name: String!
        email: String! 
        password: String!
        avatarUrl: String!
        createdAt: String!
        updatedAt: String!
    }

     type Post {
        id: ID!
        caption: String
        imageUrl: String!
        author: User!
        createdAt: String!
        updatedAt: String!
        likeCount: Int!
  }


    type GetUserAndPost {
        user: User!
        posts: [Post!]!
    }

`