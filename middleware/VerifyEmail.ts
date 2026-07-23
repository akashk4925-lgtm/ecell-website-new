import type { NextApiRequest, NextApiResponse } from "next";
import Student from "../models/Student";
import Startup from "../models/Startup";
import NormalAdmin from "../models/NormalAdmin";
import GamaAdmin from "../models/GamaAdmin";
import dbConnect from "../lib/dbConnect";

export default async function verifyEmail(
  request: NextApiRequest,
  response: NextApiResponse,
  next: () => void
): Promise<void> {
  await dbConnect();
  const emailHeader = request.headers.email;
  const email = Array.isArray(emailHeader) ? emailHeader[0] : emailHeader;

  const finder1 = await Student.find({ email });
  const finder2 = await NormalAdmin.find({ email });
  const finder3 = await GamaAdmin.find({ email });
  const finder4 = await Startup.find({ email });

  if (
    finder1.length === 0 &&
    finder2.length === 0 &&
    finder3.length === 0 &&
    finder4.length === 0
  ) {
    next();
  } else {
    response.status(404).send("Email already exists");
  }
}
