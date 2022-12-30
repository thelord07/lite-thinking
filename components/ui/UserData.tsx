import Link from 'next/link';
import {useContext} from 'react'
import { AuthContext } from "../../context";


const UserData = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  return (
    <div className='grid grid-cols-2 gap-2 grid-rows-1'>
      <div className='bg-teal-50 rounded-md p-5'>
        <h1>Datos del Usuario</h1>
        Nombre: {user?.name} <br />
        Email: {user?.email} <br />
        <button className="bg-cyan-900 text-white px-5 py-1 rounded mt-5" >Editar</button>
      </div>
      <div className='bg-teal-50 rounded-md p-5'>
        No tienes una empresa agregada.
<br />
<Link href={'/admin/add-company'}>
        <button className='bg-cyan-900 text-white px-5 py-1 rounded mt-5'>Agregar Empresa</button>
</Link>
      </div>
    </div>
  )
}

export default UserData