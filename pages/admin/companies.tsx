import React, { useContext, useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import DataTable from "react-data-table-component";
import { CompanyContext } from "../../context/companies/CompanyContext";
import { ICompany } from "../../interfaces";
import Company from "../../models/Company";
import { liteApi } from "../../api";

const columns = [
  
  {
    name: "Nombre",
    
  },
  {
    name: "Nit",
 
  },
  {
    name: "Direction",

  },
  {
    name: "Teléfono",
 
  },
  {
      name: "Usuario",
  
    },
  {
      name: "Acciones",
  }
];

const CompaniesPage = () => {
  const { companies } = useContext(CompanyContext);

  const [listCompanies, setListCompanies] = useState([])
  useEffect(() => {
    /* @ts-ignore */
    setListCompanies(companies[0])
  }, [companies])

  const handleButtonClick = async (id: string) => {
    const response = await liteApi({
        url: '/admin/companies?id='+id,
        method: 'DELETE'
    })
    window.location.reload()
  }


  return (
    <Layout>
      <>
        <h1 className="mb-5">Companias Registradas</h1>
        <table className="w-full">
          <thead>
            {columns.map((column, index) => (
              <th key={index}>{column.name}</th>
            ))}
          </thead>
          <tbody className="p-5">
            {listCompanies &&  listCompanies.map((row: any, index) => (
              <tr key={index}  >
                <td>{row?.name}</td>
                <td>{row?.nit}</td>
                <td>{row?.direction}</td>
                <td>{row?.phone}</td>
                <td>{row?.user}</td>
                <td><button className="bg-red-500 text-white px-5 py-1 rounded" onClick={() => handleButtonClick(row._id)}>Delete</button></td>
              </tr>
            ))

            }
          </tbody>
        </table>
        
      </>
    </Layout>
  );
};

export default CompaniesPage;
