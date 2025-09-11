export const queries = `#graphql


        getSignedUrlForPost(imageName: String!, imageType: String!): String
        getPosts(cursor: String, limit: Int = 10): PaginatedPosts!


`