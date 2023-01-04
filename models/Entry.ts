import mongoose, { Model, Schema } from 'mongoose';
import { Entry } from '../interfaces';

export interface IEntry extends Entry {}


const entrySchema = new Schema({
    description: { type: String, required: true },
    companyId: { type: Schema.Types.ObjectId, required: true },
    createdAt: { type: Number },
    status: {
        type: String,
        enum: {
            values: ['active', 'inactive'],
            message: '{VALUE} no es un estado permitido'
        },
        default: 'active',
    }
});


const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema );

export default EntryModel;
