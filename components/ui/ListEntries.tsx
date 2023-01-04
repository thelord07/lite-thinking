import React, {useEffect, useState } from 'react'
import { liteApi } from '../../api';
import { ICompany } from '../../interfaces/companies';


interface Props {
    company: ICompany
}

const ListEntries = ({company}: Props) => {
const [companyEntries, setCompanyEntries] = useState([])
const getEntriesByCompanyId = async () => {
   const response = await liteApi({
        url:`/entries?id=${company?._id}`
    })
    setCompanyEntries(response.data)
}

    useEffect(()=>{
        if (company?._id) { 
            getEntriesByCompanyId()
        }
    },[company])
    
  return (
    <div className='bg-teal-50 rounded-md p-5 mt-10'>
         <h1 className="font-bold mb-2">Listado de Articulos de {company?.name}</h1>
        {companyEntries?.map((entry, index) => (
            <div className=' bg-slate-100 p-5 rounded-md mb-5 ' key={index}>
                Descripcion: <br />{entry?.description}
            </div>
        ))}
    </div>
  )
}

export default ListEntries