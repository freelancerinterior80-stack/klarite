import { createHmac, timingSafeEqual, scrypt, randomBytes } from "node:crypto";

const SESSION_COOKIE = "klarite_admin";
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export { SESSION_COOKIE };

export function signSession(username: string, secret: string): string {
  const expiry = Date.now() + TTL_MS;
  const data = `${username}:${expiry}`;
  const sig = createHmac("sha256", secret).update(data).digest("hex");
  return `${data}:${sig}`;
}

export function verifySession(token: string, secret: string): string | null {
  if (!token || !secret) return null;
  const lastColon = token.lastIndexOf(":");
  const prevColon = token.lastIndexOf(":", lastColon - 1);
  if (lastColon === -1 || prevColon === -1) return null;

  const username = token.substring(0, prevColon);
  const expiry = token.substring(prevColon + 1, lastColon);
  const sig = token.substring(lastColon + 1);

  if (Date.now() > parseInt(expiry, 10)) return null;

  const data = `${username}:${expiry}`;
  const expected = createHmac("sha256", secret).update(data).digest("hex");

  try {
    const sigBuf = Buffer.from(sig, "hex");
    const expBuf = Buffer.from(expected, "hex");
    if (sigBuf.length !== expBuf.length) return null;
    return timingSafeEqual(sigBuf, expBuf) ? username : null;
  } catch {
    return null;
  }
}

export function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  return new Promise((res, rej) =>
    scrypt(password, salt, 64, (err, key) =>
      err ? rej(err) : res(`${salt}:${key.toString("hex")}`)
    )
  );
}

export function verifyPassword(password: string, stored: string): Promise<boolean> {
  const colonIdx = stored.indexOf(":");
  if (colonIdx === -1) return Promise.resolve(false);
  const salt = stored.slice(0, colonIdx);
  const hash = stored.slice(colonIdx + 1);
  return new Promise((res) =>
    scrypt(password, salt, 64, (err, key) => {
      if (err) return res(false);
      try {
        res(timingSafeEqual(Buffer.from(hash, "hex"), key));
      } catch {
        res(false);
      }
    })
  );
}
