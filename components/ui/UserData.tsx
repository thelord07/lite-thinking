import Link from "next/link";
import { useContext, useEffect } from "react";
import { AuthContext, CompanyContext } from "../../context";
import { ICompany, IUser } from "../../interfaces";
import liteApi from "../../api/liteApi";

const UserData = () => {
  const { user } = useContext(AuthContext);
  const { companies } = useContext(CompanyContext);
  console.log();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 grid-rows-1">
      <div className="bg-teal-50 rounded-md p-5">
        <h1 className=" font-bold ">Datos del Usuario</h1>
        Nombre: {user?.name} <br />
        Email: {user?.email} <br />
    
      </div>
      <div className="bg-teal-50 rounded-md p-5">
        {companies.length === 0 ? (
          <>
            No tienes una empresa agregada.
            <br />
            <Link href={"/admin/add-company"}>
              <button className="bg-cyan-900 text-white px-5 py-1 rounded mt-5">
                Agregar Empresa
              </button>
            </Link>
          </>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-5">
              <h1 className=" font-bold w-3/4  sm:mb-0 mb-3 ">
                Datos de la Empresas{" "}
                <span className=" bg-slate-500 py-1 px-2 rounded-full ">
                  {companies[0].length}
                </span>
              </h1>
              <Link href={"/admin/add-company"}>
                <button className="bg-cyan-900 text-white px-5 py-1 rounded ">
                  Agregar Empresa
                </button>
              </Link>
            </div>

            {companies[0].map((company: ICompany, index: string) => (
              <div
                key={index}
                className=" bg-slate-200 px-5 py-2 rounded-md flex flex-row justify-between items-center mb-2 "
              >
                <div className="flex-col">
                  <p>Nombre: {company.name}</p>
                  Nit: {company.nit}
                </div>
                <div>
                <Link href={`/admin/company/${company._id}/entries`}>
                <button className="bg-orange-500 text-white px-5 py-1 rounded mr-2 ">
                   Articulos
                </button>
              </Link>
                <Link href={`/admin/company/${company._id}`}>
                <button className="bg-cyan-900 text-white px-5 py-1 rounded ">
                  Editar
                </button>
              </Link>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default UserData;
