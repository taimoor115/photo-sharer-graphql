import { V4 } from "paseto";
import { createPrivateKey, createPublicKey } from "crypto";
import { PASETO_PRIVATE_KEY, PASETO_PUBLIC_KEY } from "../config/env.config.js";

function decodePrivateKey(key: string) {
  return createPrivateKey({
    key: Buffer.from(key, "base64"),
    format: "der",
    type: "pkcs8",
  });
}

function decodePublicKey(key: string) {
  return createPublicKey({
    key: Buffer.from(key, "base64"),
    format: "der",
    type: "spki",
  });
}

/**
 * Generate a signed Paseto v4 token
 */
export async function generatePasetoToken(
  payload: Record<string, unknown> // 👈 fixes TS2345
): Promise<string> {
  const privateKey = decodePrivateKey(PASETO_PRIVATE_KEY!);
  return await V4.sign(payload, privateKey);
}

/**
 * Verify and decode a Paseto v4 token
 */
export async function verifyPasetoToken<T extends Record<string, unknown>>(
  token: string
): Promise<T> {
  const publicKey = decodePublicKey(PASETO_PUBLIC_KEY!);
  return (await V4.verify(token, publicKey)) as T;
}
