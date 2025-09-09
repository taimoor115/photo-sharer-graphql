
import bcrypt from "bcrypt";
import prismaClient from "../lib/db.js";

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export class UserService {

    private static async findUserByEmail(email: string) {

        if (!email) {
            throw new Error("Email is required");
        }


        const user = await prismaClient.user.findUnique({
            where: { email }
        })


        return user;
    }
    public static async registerUser(payload: RegisterPayload) {
        const { name, email, password } = payload;


        if (!name || !email || !password) {
            const error: any = new Error("All fields are required");
            error.extensions = { code: "BAD_REQUEST", httpStatus: 400 };
            throw error;
        }

        if (!email.includes("@")) {
            const error: any = new Error("Invalid email format");
            error.extensions = { code: "BAD_REQUEST", httpStatus: 400 };
            throw error;
        }

        if (password.length < 6) {
            const error: any = new Error("Password too short");
            error.extensions = { code: "BAD_REQUEST", httpStatus: 400 };
            throw error;
        }


        const existingUser = await this.findUserByEmail(email);
        if (existingUser) {
            const error: any = new Error("Email already in use");
            error.extensions = { code: "CONFLICT", httpStatus: 409 };
            throw error;
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prismaClient.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        if (!newUser) {
            const error: any = new Error("Failed to create user");
            error.extensions = { code: "INTERNAL_SERVER_ERROR", httpStatus: 500 };
            throw error;

        }

        return newUser;
    }
}
