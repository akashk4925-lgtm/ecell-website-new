import type { NextApiRequest, NextApiResponse } from "next";

export default function verifyBhuOrganization(
  request: NextApiRequest,
  response: NextApiResponse,
  next: () => void
): void {
  const email = request.body?.email || "";
  const arr = email.split("@");

  if (arr[1] === "iitbhu.ac.in" || arr[1] === "itbhu.ac.in" || arr[1] === "ecell.iitbhu.ac.in") {
    return next();
  } else {
    response.status(403).send("Not authorized for BHU organization");
  }
}
