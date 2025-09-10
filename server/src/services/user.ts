
import bcrypt from "bcrypt";
import prismaClient from "../lib/db.js";
import { generatePasetoToken } from "../utils/token.util.js";
import { handleError } from "../utils/error.util.js";

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
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
        });

        return token;

    }
}
