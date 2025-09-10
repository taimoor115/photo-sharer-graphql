
import bcrypt from "bcrypt";
import prismaClient from "../lib/db.js";
import { handleError } from "../utils/error.util.js";
import { generatePasetoToken } from "../utils/token.util.js";

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export class UserService {
    private static async findUserByEmail(email: string) {
        if (!email) {
            handleError("Email is required", "BAD_REQUEST", 400);
        }
        return prismaClient.user.findUnique({ where: { email } });
    }

    public static async registerUser(payload: RegisterPayload) {
        const { name, email, password } = payload;

        if (!name || !email || !password) {
            handleError("All fields are required", "BAD_REQUEST", 400);
        }

        const existingUser = await this.findUserByEmail(email);
        if (existingUser) {
            handleError("Email already in use", "CONFLICT", 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prismaClient.user.create({
            data: { name, email, password: hashedPassword },
        });

        return newUser;
    }

    public static async loginUser(payload: { email: string; password: string }) {
        const { email, password } = payload;

        if (!email || !password) {
            handleError("Email and password are required", "BAD_REQUEST", 400);
        }

        const user = await this.findUserByEmail(email);
        if (!user) {
            handleError("Invalid email or password", "UNAUTHORIZED", 401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            handleError("Invalid email or password", "UNAUTHORIZED", 401);
        }
        const token = await generatePasetoToken({
            sub: user.id,
            email: user.email,
            iat: new Date().toISOString(),
            exp: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
        });

        return token;

    }


    public static async getUserById(id: string) {
        if (!id) {
            handleError("User ID is required", "BAD_REQUEST", 400);
        }
        return prismaClient.user.findUnique({ where: { id } });
    }
}
