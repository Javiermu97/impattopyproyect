import crypto from "crypto";

function base64url(input: Buffer | string) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function generateCodeVerifier() {
  return base64url(crypto.randomBytes(32));
}

export function generateCodeChallenge(verifier: string) {
  const hash = crypto.createHash("sha256").update(verifier).digest();
  return base64url(hash);
}

export function randomState() {
  return base64url(crypto.randomBytes(16));
}
