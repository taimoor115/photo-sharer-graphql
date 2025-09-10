import { UserService } from "../../services/user.js";
import { handleError } from "../../utils/error.util.js";

const queries = {
    getCurrentUser: async (_: any, args: any, ctx: any) => {
        const { sub = "" } = ctx.user || {}

        if (!sub) return handleError("Unauthorized", "UNAUTHORIZED", 401);

        const user = await UserService.getUserById(sub);
        return user;
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

export const resolvers = {
    Query: queries,
    Mutation: mutations
}