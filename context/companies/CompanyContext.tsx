import { createContext } from 'react';
import { ICompany } from '../../interfaces';

interface ContextProps {
    companies: ICompany[];

    addNewCompany: (company: ICompany) => void;
    updateCompany: (company: ICompany) => void;
    refreshCompanies:(companies: ICompany[]) => void;
}


export const CompanyContext = createContext({} as ContextProps );