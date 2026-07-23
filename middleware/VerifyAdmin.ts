import type { NextApiRequest, NextApiResponse } from "next";
import NormalAdmin from "../models/NormalAdmin";
import GamaAdmin from "../models/GamaAdmin";
import dbConnect from "../lib/dbConnect";

export default async function verifyAdmin(
  request: NextApiRequest,
  response: NextApiResponse,
  next: () => void
): Promise<void> {
  await dbConnect();
  const emailHeader = request.headers.email;
  const email = Array.isArray(emailHeader) ? emailHeader[0] : emailHeader || null;

  const finder1 = await NormalAdmin.find({ email });
  const finder2 = await GamaAdmin.find({ email });

  if (finder1.length > 0 || finder2.length > 0) {
    return next();
  } else {
    response.status(404).send("Not an admin");
  }
}
