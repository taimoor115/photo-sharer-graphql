import { UserService } from "../../services/user.js";

const queries = {};
const mutations = {

    registerUser: async (_: any, payload: { email: string, password: string, name: string }) => {

        const user = UserService.registerUser(payload)
        return user;

    }
};


export const resolvers = {
    Query: queries,
    Mutation: mutations
}