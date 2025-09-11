import { PostService } from "../../services/post.js";
import { UserService } from "../../services/user.js";
import { handleError } from "../../utils/error.util.js";

const queries = {
    getCurrentUser: async (_: any, args: any, ctx: any) => {
        const { sub = "" } = ctx.user || {}

        if (!sub) return handleError("Unauthorized", "UNAUTHORIZED", 401);

        const user = await UserService.getUserById(sub);
        return user;
    },



    getUserAndPosts: async (_: any, args: { userId: string }) => {
        const user = await UserService.getUserById(args.userId);
        return { user };
    },


};
const mutations = {

    registerUser: async (_: any, payload: { email: string, password: string, name: string }) => {

        const user = UserService.registerUser(payload)
        return user;

    },

    loginUser: async (_: any, payload: { email: string, password: string }) => {

        const token = await UserService.loginUser(payload);
        return token;
    }

};


const extraResolvers = {
    GetUserAndPost: {
        user: (parent: any) => parent.user,
        posts: async (parent: any) => {
            return PostService.getPostsByUserId(parent.user.id);
        },
    },
    Post: {
        author: async (parent: any) => {
            return UserService.getUserById(parent.authorId);
        },
        likeCount: async (parent: any) => {
            return PostService.countLikes(parent.id);
        },
    },
};

export const resolvers = {
    Query: queries,
    Mutation: mutations,
    ExtraResolvers: extraResolvers,
}