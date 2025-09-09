import { V4 } from "paseto";
import { PASETO_PRIVATE_KEY, PASETO_PUBLIC_KEY } from "../config/env.config.js";


export async function generatePasetoToken(payload: object) {
  return await V4.sign(payload as Record<string, unknown>, PASETO_PRIVATE_KEY!);
}

export async function verifyPasetoToken(token: string) {
  return await V4.verify(token, PASETO_PUBLIC_KEY!);
}
