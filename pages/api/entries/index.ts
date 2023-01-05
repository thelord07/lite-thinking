import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry } from "../../../models";
import { IEntry } from '../../../models/Entry';
type Data = { message: string } | IEntry[] | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(req, res);

    case "POST":
      return postEntry(req, res);

    default:
      return res.status(400).json({ message: "Endpoint no existe" });
  }
}

const getEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  if (id) {
    await db.connect();
    const entries = await Entry.find({companyId: id}).sort({ createdAt: "ascending" });
    await db.disconnect();

    return res.status(200).json(entries);
  }
  await db.connect();
  const entries = await Entry.find().sort({ createdAt: "ascending" });
  await db.disconnect();

  return res.status(200).json(entries);
};

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = "", id = "" } = req.body;

  const newEntry = new Entry({
    description,
    companyId: id,
    createdAt: Date.now(),
  });

  try {
    await db.connect();
    await newEntry.save();
    await db.disconnect();

    return res.status(201).json(newEntry);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo salio mal, revisar consola del servidor" });
  }
};
