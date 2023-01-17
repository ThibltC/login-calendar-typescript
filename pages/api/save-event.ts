import type { NextApiRequest, NextApiResponse } from "next";

export default function handleSaveEvent(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<unknown> {
  const { method } = req;
  return new Promise((resolve) => {
    switch (method) {
      case "POST":
        res.status(200).json({ message: "OK", body: req.body });
        break;
      default:
        res.setHeader("Allow", ["POST"]);
        res.setHeader("Content-Type", "application/json");
        res
          .status(405)
          .end(JSON.stringify({ message: `Method ${method} Not Allowed` }));
    }
  });
}
