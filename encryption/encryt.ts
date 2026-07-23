import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export default async function encrypt(
  myPlaintextPassword: string
): Promise<string> {
  return bcrypt.hash(
    myPlaintextPassword,
    parseInt(process.env.SALT_ROUNDS ?? "", 10)
  );
}
