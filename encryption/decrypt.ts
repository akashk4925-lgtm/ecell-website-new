import bcrypt from "bcrypt";

export default async function decrypt(
  myPlaintextPassword: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(myPlaintextPassword, hash);
}
