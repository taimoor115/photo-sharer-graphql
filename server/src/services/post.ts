
import prismaClient from "../lib/db.js";
import { handleError } from "../utils/error.util.js";


export class PostService {
    private static async findPostById(id: string) {
        if (!id) {
            handleError("Post ID is required", "BAD_REQUEST", 400);
        }
        return prismaClient.post.findUnique({ where: { id, isDeleted: false } });
    }

    public static async createPost(payload: { caption: string; imageUrl: string; userId: string }) {
        const { caption, imageUrl, userId } = payload;

        if (!caption || !imageUrl || !userId) {
            handleError("All fields are required", "BAD_REQUEST", 400);
        }

        const newPost = await prismaClient.post.create({
            data: { caption, imageUrl, authorId: userId },
        });

        if (!newPost) {
            handleError("Failed to create post", "INTERNAL_SERVER_ERROR", 500);
        }

        return newPost;
    }


    public static async updatePost(postId: string, payload: { caption?: string; imageUrl?: string }, userId: string) {

        if (!postId || !userId) {
            handleError("Post ID and User ID are required", "BAD_REQUEST", 400);
        }
        const post = await this.findPostById(postId);
        if (!post) {
            handleError("Post not found", "NOT_FOUND", 404);
        }
        if (post.authorId !== userId) {
            handleError("You are not authorized to update this post", "FORBIDDEN", 403);
        }
        const updatedPost = await prismaClient.post.update({
            where: {
                id: postId,
                authorId: userId
            },
            data: {
                ...payload
            }
        })
        if (!updatedPost) {
            handleError("Failed to update post", "INTERNAL_SERVER_ERROR", 500);
        }
        return updatedPost;
    }

    public static async deletePost(postId: string, userId: string) {

        if (!postId || !userId) {
            handleError("Post ID and User ID are required", "BAD_REQUEST", 400);
        }


        const post = await this.findPostById(postId);
        if (!post) {
            handleError("Post not found", "NOT_FOUND", 404);
        }


        if (post.authorId !== userId) {
            handleError("You are not authorized to delete this post", "FORBIDDEN", 403);
        }

        const deletedPost = await prismaClient.post.update({
            where: {
                id: postId,
                authorId: userId
            },
            data: {
                isDeleted: true
            }
        })


        if (!deletedPost) {
            handleError("Failed to delete post", "INTERNAL_SERVER_ERROR", 500);
        }

        return deletedPost;

    }


}


