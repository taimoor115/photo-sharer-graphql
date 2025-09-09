import dotenv from "dotenv";
dotenv.config();
const { PASETO_PRIVATE_KEY, PASETO_PUBLIC_KEY } = process.env;

export { PASETO_PRIVATE_KEY, PASETO_PUBLIC_KEY };
