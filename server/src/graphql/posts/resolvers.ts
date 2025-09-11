import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AWS_ACCESS_ID, AWS_DEFAULT_REGION, AWS_SECRET_KEY, BUCKET_NAME } from "../../config/env.config.js";
import type { CreatePostPayload, GraphqlContext } from "../../interfaces.js";
import { PostService } from "../../services/post.js";
import { handleError } from "../../utils/error.util.js";
import { UserService } from "../../services/user.js";



const s3Client = new S3Client({
    region: AWS_DEFAULT_REGION!,
    credentials: {
        accessKeyId: AWS_ACCESS_ID!,
        secretAccessKey: AWS_SECRET_KEY!,
    }
});
const mutations = {
    createPost: async (
        _: any,
        { payload }: { payload: CreatePostPayload },
        ctx: GraphqlContext
    ) => {
        if (!ctx.user) throw new Error("You are not authenticated");
        const post = await PostService.createPost({
            ...payload,
            userId: ctx.user.sub,
        });

        return post;
    },


    updatePost: async (_: any, { postId, payload }: { postId: string, payload: CreatePostPayload }, ctx: GraphqlContext) => {
        if (!ctx.user) throw new Error("You are not authenticated");
        const post = await PostService.updatePost(postId, payload, ctx.user.sub);
        return post;
    },


    deletePost: async (_: any, { postId }: { postId: string }, ctx: GraphqlContext) => {
        if (!ctx.user) throw new Error("You are not authenticated");
        const post = await PostService.deletePost(postId, ctx.user.sub);
        return post.id

    },
    likeUnlikePost: async (_: any, { postId }: { postId: string }, ctx: GraphqlContext) => {
        if (!ctx.user) throw new Error("You are not authenticated");
        const post = await PostService.likeUnlikePost(postId, ctx.user.sub);
        return post;
    }
}
const queries = {
    getSignedUrlForPost: async (
        _: any,
        { imageType, imageName }: { imageType: string; imageName: string },
        ctx: GraphqlContext
    ) => {
        if (!ctx.user || !ctx.user.sub) return handleError("Unauthorized", "UNAUTHORIZED", 401);
        const allowedImageTypes = [
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedImageTypes.includes(imageType))
            return handleError("Invalid image type", "BAD_REQUEST", 400);



        const putObjectCommand = new PutObjectCommand({
            Bucket: BUCKET_NAME!,
            ContentType: imageType,
            Key: `uploads/${ctx.user.sub}/posts/${imageName}-${Date.now()}`,
        });

        const signedURL = await getSignedUrl(s3Client, putObjectCommand);

        return signedURL;
    },



    getPosts: async (_: any, { cursor, limit = 10 }: { cursor?: string, limit?: number }, ctx: GraphqlContext) => {
        if (!ctx.user || !ctx.user.sub) return handleError("Unauthorized", "UNAUTHORIZED", 401);
        const posts = await PostService.getPosts(cursor, limit);
        return posts;
    },
}

export const resolvers = {
    Mutation: mutations,
    Query: queries,
}