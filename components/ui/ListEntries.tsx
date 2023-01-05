import React, { useEffect, useState } from "react";
import { liteApi } from "../../api";
import { ICompany } from "../../interfaces/companies";
import BtnSendEmail from "./BtnSendEmail";
import jsPDF from "jspdf";
import 'jspdf-autotable'

interface Props {
  company: ICompany;
}

const ListEntries = ({ company }: Props) => {
  const [companyEntries, setCompanyEntries] = useState([]);
  const getEntriesByCompanyId = async () => {
    const response = await liteApi({
      url: `/entries?id=${company?._id}`,
    });
    setCompanyEntries(response.data);
  };

  useEffect(() => {
    if (company?._id) {
      getEntriesByCompanyId();
    }
  }, [company]);

  const downloadData = () => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: "#table" });
    pdf.save("entries.pdf");
  };

  return (
    <div className="bg-teal-50 rounded-md p-5 mt-10">
      <h1 className="font-bold mb-2">
        Listado de Articulos de {company?.name}
      </h1>
      <BtnSendEmail />
      <button className="bg-cyan-900 text-white px-5 py-1 rounded mt-5" onClick={downloadData}>
        DOWNLOAD DATA
      </button>
      <table id="table" className="w-full">
        <thead>
        <tr>
            <th>id</th>
            <th>Descripcion</th>
            <th>Compañia</th>
            <th>Acciones</th>
        </tr>
        </thead>
          <tbody>
            {companyEntries?.map((entry, index) => (
              <tr key={index}>
                <th>{entry._id}</th>
                <th>{entry?.description}</th>
                <th>{entry?.companyId}</th>
                <th>eliminar</th>
              </tr>
            ))}
          </tbody>
   
      </table>
    </div>
  );
};

export default ListEntries;
