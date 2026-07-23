import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function verifySuperAdmin(
  request: NextApiRequest,
  response: NextApiResponse,
  next: () => void
): void {
  const tokenHeader = request.headers.superadmintoken;
  const token = Array.isArray(tokenHeader) ? tokenHeader[0] : tokenHeader;

  if (!token) {
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
