import type { NextApiRequest, NextApiResponse } from "next";
import { Company, User } from "../../../models";
import { db } from "../../../database";
import { ICompany } from "../../../interfaces";
import { getSession } from "next-auth/react";

type Data = { message: string } | ICompany;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getCompanyById(req, res);
    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const getCompanyById = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connect();
  const { id } = req.query;
  if(!id){
    return res.status(302).json({message: "id No existe"})
  }

  const company = await Company.findOne({ _id: id });
  console.log({company})
  await db.disconnect();
  // @ts-ignore
  return res.status(200).json(company);
};
