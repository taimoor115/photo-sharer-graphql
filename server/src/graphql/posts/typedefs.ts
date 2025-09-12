export const typeDefs = `#graphql


 input CreatePostData {
        caption: String
        imageUrl: String!
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
    type PaginatedPosts {
        posts: [Post!]!
        nextCursor: String
    }

    type Subscription {
    newPost: Post!
    }

`