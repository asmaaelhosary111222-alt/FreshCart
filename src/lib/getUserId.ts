import { getMyToken } from "@/lib/getMyToken";

export async function getUserId() {
  const token = await getMyToken();

  if (!token) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url").toString("utf8")
    );

    return typeof payload.id === "string" ? payload.id : null;
  } catch {
    return null;
  }
}