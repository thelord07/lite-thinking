import type { NextApiRequest, NextApiResponse } from "next";
import { Company } from "../../../models";
import { db } from "../../../database";

type Data =
  | { message: string }
  | {
      company: {
        name: string;
        direction: string;
        nit: string;
        phone: number;
        usersIds: string[];
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return storeCompany(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const storeCompany = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    name = "",
    direction = "",
    nit = "",
    phone = "",
    usersIds = "",
  } = req.body as {
    name: string;
    direction: string;
    nit: string;
    phone: number;
    usersIds: string[];
  };


  await db.connect();
  const newCompany = new Company([name, direction, nit, phone, usersIds]);

  try {
    newCompany.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revisar logs del servidor",
    });
  }
};
