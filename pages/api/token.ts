import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  token: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const credentials = req.body;
  const secret = process.env.NEXTAUTH_SECRET ?? "";
  const token = jwt.sign(credentials, secret);
  res.status(200).json({ token });
}
