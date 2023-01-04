import { isValidObjectId } from 'mongoose';
import { db } from '.';
import { ICompany } from '../interfaces';
import { Company } from '../models';


export const getCompanyById = async( id: string ):Promise<ICompany| null> => {

    if ( !isValidObjectId(id) ){
        return null;
    }

    await db.connect();
    const company = await Company.findById( id ).lean();
    await db.disconnect();

    if ( !company ) {
        return null;
    }

    return JSON.parse(JSON.stringify(company));


}


export const getCompaniesByUser = async( userID: string ): Promise<ICompany[] > => {
    
    if ( !isValidObjectId(userID) ){
        return [];
    }

    await db.connect();
    const companies = await Company.find({ user: userID }).lean();

    await db.disconnect();


    return JSON.parse(JSON.stringify(companies));


}