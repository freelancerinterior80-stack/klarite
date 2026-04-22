import { createHmac, timingSafeEqual } from 'node:crypto';

const SESSION_COOKIE = "klarite_admin";
const TTL_MS = 7 * 24 * 60 * 60 * 1e3;
function signSession(username, secret) {
  const expiry = Date.now() + TTL_MS;
  const data = `${username}:${expiry}`;
  const sig = createHmac("sha256", secret).update(data).digest("hex");
  return `${data}:${sig}`;
}
function verifySession(token, secret) {
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

export { SESSION_COOKIE as S, signSession as s, verifySession as v };
