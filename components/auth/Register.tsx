import React from 'react'
import InputComponent from '../ui/InputComponent'


export const Register = () => {
  return (
    <div className="bg-white md:w-1/3 w-[90%] rounded-xl p-6 text-center">
    <h1 className="m-3 font-bold text-lg">Login</h1>
    <section>
      <InputComponent type="text" name="email" label="E-mail" />
      <InputComponent type="password" name="password" label="Contraseña" />
      <InputComponent type="checkbox" name="remember" label="Recordarme" />
      <button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Ingresar</button>
    </section>
  </div>
  )
}
