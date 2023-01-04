import Link from "next/link";
import React, { ReactNode, useContext } from "react";
import { AuthContext } from "../../context";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  return (
    <div className="w-screen h-screen bg-slate-200 flex flex-row">
      {isLoggedIn && user?.role === "admin" && (
        <div className="bg-cyan-800 text-white w-1/5 px-5 py-5 ">
          <h2>Menu</h2>
          <hr className="mb-5" />

          <ul className="">
            <li className="py-2 hover:bg-cyan-700 px-2 rounded-md">
              <Link href={"/"}>Usuarios</Link>
            </li>
            <li className="py-2 hover:bg-cyan-700 px-2 rounded-md">
              <Link href={"/admin/companies"}>Empresas</Link>
            </li>
          
          </ul>
        </div>
      )}
      <div className={user?.role === "admin" ? "w-4/5" : "w-full"}>
        <div className="border-b-2 border-slate-300 px-10 py-5 flex flex-row justify-between items-center">
          <h1>Dashboard</h1>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col justify-start items-end">
              <h4>{user?.name}</h4>
              <small>{user?.role}</small>
              <button onClick={logout}>salir</button>
            </div>
          </div>
        </div>
        <div className="px-10 py-5">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
