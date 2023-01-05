import type { NextApiRequest, NextApiResponse } from "next";
import { testMail } from "../../services/aws-ses";

type Data = { message: string } | any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return checkUserAPI(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const checkUserAPI = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { email } = req.body;
console.log(email)
  const result = await testMail(email);
  return res.json(result);
};
