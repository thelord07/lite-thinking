import { FC, ReactNode, useReducer, useEffect } from 'react';
import { useSnackbar } from 'notistack';


import { ICompany } from '../../interfaces';
import { CompanyContext, CompanyReducer } from './';
import liteApi from '../../api/liteApi';

export interface CompanyState {
    companies: ICompany[];
}


const Company_INITIAL_STATE: CompanyState = {
    companies: [],
}


export const CompanyProvider = ({ children }: {children: ReactNode}) => {

    const [state, dispatch] = useReducer( CompanyReducer , Company_INITIAL_STATE );
    /* const { enqueueSnackbar } = useSnackbar(); */

    const addNewCompany = async( company: ICompany ) => {

        const { data } = await liteApi.post<ICompany>('/admin/companies', { company });
        dispatch({ type: '[Company] - Add-Company', payload: data });

    }

    const updateCompany = async( { name, nit, direction, phone, _id }: ICompany, showSnackbar = false ) => {
        try {
            const { data } = await liteApi.put<ICompany>(`/admin/companies/${ _id }`, { name, nit, direction, phone });
            dispatch({ type: '[Company] - Update-Company', payload: data });

        } catch (error) {
            console.log({ error });
        }
    }

    const refreshCompanies = async() => {
        const { data } = await liteApi.get<ICompany[]>('/admin/companies');
        dispatch({ type: '[Company] - Refresh-Companies', payload: data });
    }

    useEffect(() => {
     refreshCompanies()
    }, [])
    

    return (
        <CompanyContext.Provider value={{
            ...state,

            addNewCompany,
            updateCompany,
            refreshCompanies,

        }}>
            { children }
        </CompanyContext.Provider>
    )
};