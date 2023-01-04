import mongoose, { Schema, model, Model } from "mongoose";
import { ICompany } from "../interfaces";

const companySchema = new Schema(
  {
    user:      { type: Schema.Types.ObjectId, ref: "User", required: true },
    name:      { type: String, require: true },
    direction: { type: String, require: true },
    nit:       { type: String, require: true },
    phone:     { type: Number, require: true },
    posts:     { type: String },
  },
  {
    timestamps: true,
  }
);

const Company: Model<ICompany> =
  mongoose.models.Company || model("Company", companySchema);

export default Company;
