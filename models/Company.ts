import mongoose, {Schema, model, Model} from "mongoose"
import { ICompany } from "../interfaces"

const companySchema = new Schema({
    name: {type: String, require: true},
    direction: {type: String, require: true},
    nit: {type:String, require: true},
    phone: {type: Number, require: true},
    usersIds: {type: String, require:true},
    posts: {type: String}
},{
    timestamps: true
})

const Company: Model<ICompany> = mongoose.models.Company || model('Company', companySchema)

export default Company;