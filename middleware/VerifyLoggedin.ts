import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function verifyLoggedin(
  request: NextApiRequest,
  response: NextApiResponse,
  next: () => void
): void {
  const token =
    (request.body && request.body.token) ||
    (request.query && request.query.token) ||
    request.headers["x-access-token"] ||
    request.headers.authorization;

  if (!token || typeof token !== "string") {
    response.send("A token is required for authentication");
    return;
  }
  try {
    jwt.verify(token, process.env.SECRET_KEY || "");
    return next();
  } catch {
    response.status(401).send("Invalid Token");
    return;
  }
}
