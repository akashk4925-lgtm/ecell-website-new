import type { NextApiRequest, NextApiResponse } from "next";
import GamaAdmin from "../models/GamaAdmin";
import dbConnect from "../lib/dbConnect";

export default async function verifyGammaAdmin(
  request: NextApiRequest,
  response: NextApiResponse,
  next: () => void
): Promise<void> {
  await dbConnect();
  const emailHeader = request.headers.email;
  const email = Array.isArray(emailHeader) ? emailHeader[0] : emailHeader;

  const finder = await GamaAdmin.find({ email });

  if (finder.length > 0) {
    next();
  } else {
    response.send("Not a gamma admin");
  }
}
