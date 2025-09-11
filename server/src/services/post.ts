
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

    public static async likeUnlikePost(postId: string, userId: string) {
        if (!postId || !userId) {
            handleError("Post ID and User ID are required", "BAD_REQUEST", 400);
        }
        const post = await this.findPostById(postId);
        if (!post) {
            handleError("Post not found", "NOT_FOUND", 404);
        }
        const existingLike = await prismaClient.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId
                }
            }
        });

        if (existingLike) {
            try {
                await prismaClient.like.delete({
                    where: {
                        userId_postId: {
                            userId,
                            postId
                        }
                    }
                })
            } catch (error) {
                return handleError("Failed to unlike post", "INTERNAL_SERVER_ERROR", 500);
            }

            return "Unliked post successfully....";
        }

        const newLike = await prismaClient.like.create({
            data: {
                userId,
                postId
            }
        });

        if (!newLike) {
            handleError("Failed to like post", "INTERNAL_SERVER_ERROR", 500);
        }

        return "Liked post successfully....";
    }

    public static async getPosts(cursor?: string, limit: number = 10) {
        const findManyArgs: any = {
            take: limit + 1,
            skip: cursor ? 1 : 0,
            orderBy: { createdAt: "desc" },
            include: {
                author: true,
                _count: {
                    select: { likes: true },
                },
            },
        };
        if (cursor) {
            findManyArgs.cursor = { id: cursor };
        }
        const posts = await prismaClient.post.findMany(findManyArgs) || [];

        let nextCursor: string | null = null;
        if (posts.length > limit) {
            const nextItem = posts.pop();
            nextCursor = nextItem?.id ?? null;
        }


        return {
            posts: posts.map((p: any) => ({
                ...p,
                likeCount: p._count.likes,
            })),
            nextCursor,
        };
    }

    public static async getPostsByUserId(userId: string) {
        if (!userId) {
            handleError("User ID is required", "BAD_REQUEST", 400);
        }
        const posts = prismaClient.post.findMany({
            where: { authorId: userId, isDeleted: false },
            orderBy: { createdAt: "desc" },
            include: {
                author: true,
                _count: {
                    select: { likes: true },
                },
            },
        });
        return posts;
    }
    public static async countLikes(postId: string) {
        if (!postId) {
            handleError("Post ID is required", "BAD_REQUEST", 400);
        }
        const count = await prismaClient.like.count({
            where: { postId },
        });
        return count;
    }
}
