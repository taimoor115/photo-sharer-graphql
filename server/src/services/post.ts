
import prismaClient from "../lib/db.js";
import { handleError } from "../utils/error.util.js";


export class PostService {
    private static async findPostById(id: string) {
        if (!id) {
            handleError("Post ID is required", "BAD_REQUEST", 400);
        }
        return prismaClient.post.findUnique({ where: { id } });
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


}


