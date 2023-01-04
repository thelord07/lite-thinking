import type { NextApiRequest, NextApiResponse } from "next";
import { Company, User } from "../../../models";
import { db } from "../../../database";
import { ICompany } from "../../../interfaces";
import { getSession } from "next-auth/react";

type Data = { message: string } | ICompany[] | ICompany;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getCompanies(req, res);
    case "POST":
      return storeCompany(req, res);
    case "PUT":
      return updateCompany(req, res);
    case 'DELETE': 
      return deleteCompany(req, res);
    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const getCompanies = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connect();
  const session: any = await getSession({ req });
  if (!session) {
    return res.status(404).json({ message: "User Disconnected" });
  }
  if (session.user.role !== "admin") {
    const companies = await Company.find({ user: session.user._id }).sort({
      createdAt: "descending",
    });
    await db.disconnect();
    return res.status(200).json(companies);
  }

  const companies = await Company.find();
  await db.disconnect();
  return res.status(200).json(companies);
};

const storeCompany = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    name = "",
    direction = "",
    nit = "",
    phone = "",
    email = "",
  } = req.body;

  await db.connect();

  const session: any = await getSession({ req });

  if (!session) {
    return res.status(404).json({ message: "User Disconnected" });
  }

  const newCompany = new Company({
    name,
    direction,
    nit,
    phone,
    user: session.user._id,
  });

  try {
    newCompany.save();
    await db.disconnect();
    return res.status(201).json(newCompany);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(500).json({
      message: "Revisar logs del servidor",
    });
  }
};

const updateCompany = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {


  await db.connect();
  const { id } = req.query;
  const session: any = await getSession({ req });

  if (!session) {
    return res.status(404).json({ message: "User Disconnected" });
  }

  const companyToUpdate = await Company.findById(id);

  if (!companyToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay Compañia con ese ID: " + id });
  }

  const {
    name = companyToUpdate.name,
    nit = companyToUpdate.nit,
    phone = companyToUpdate.phone,
    direction = companyToUpdate.direction
} = req.body;

try {
  const updatedCompany = await Company.findByIdAndUpdate( id, { name, nit, direction, phone }, { runValidators: true, new: true });
  await db.disconnect();
  res.status(200).json( updatedCompany! );
  
} catch (error: any) {
  await db.disconnect();
  res.status(400).json({ message: error.errors.status.message });
}

};


const deleteCompany = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connect();
  const { id } = req.query;
  const deleteCompany = await Company.findByIdAndDelete(id)
  return res.status(200).json({message: `Compañia eliminada con exito id =` + id})
  await db.disconnect()
}