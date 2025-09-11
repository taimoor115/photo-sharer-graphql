export const mutations = `#graphql

 createPost(payload: CreatePostData!): Post
 deletePost(postId: ID!): String
 updatePost(postId: ID!, payload: CreatePostData!): Post
 likeUnlikePost(postId: ID!): String
`