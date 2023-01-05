import { useState } from "react";
import { useForm } from "react-hook-form";
import { NextPage } from 'next';

import Layout from "../../components/layouts/Layout";

import liteApi from "../../api/liteApi";
import { useRouter } from 'next/router';


type FormData = {
  name: string;
  direction: string;
  nit: string;
  phone: number;
};

const AddCompanyPage:NextPage = () => {
const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();
  const [showError, setShowError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('')

  const onSaveCompany = async ({ name, direction, nit, phone }: FormData) => {
    setShowError(false);

    const saveCompany = await liteApi({
      url: "/admin/companies",
      method: "POST",
      data: {
        name,
        direction,
        nit,
        phone
      },
    });
    if (saveCompany.status === 201) {
      setMessage(saveCompany.data.message)
      reset()
      window.location.href = "/admin"
    }
  };

  return (
    <Layout>
      <h1>Agrega tu Empresa:</h1>
      {showError && (
        <>
          <h1>Error al guardar los datos</h1>
        </>
      )}
      <form
        onSubmit={handleSubmit(onSaveCompany)}
        noValidate
        className="grid grid-cols-2 gap-4"
      >
        <input
          type="text"
          className="rounded my-2 pl-2 py-1"
          placeholder="Nombre"
          {...register("name", {
            required: "Este campo es requerido",
          })}
        />
        <input
          type="text"
          className="rounded my-2 pl-2 py-1"
          placeholder="Dirección"
          {...register("direction", {
            required: "Este campo es requerido",
          })}
        />
        <input
          type="text"
          className="rounded my-2 pl-2 py-1"
          placeholder="Nit"
          {...register("nit", {
            required: "Este campo es requerido",
          })}
        />
        <input
          type="number"
          className="rounded my-2 pl-2 py-1"
          {...register("phone", {
            required: "Este campo es requerido",
          })}
          placeholder="Teléfono"
        />
        <button
          className="bg-cyan-900 text-white px-5 py-1 rounded mt-5"
          type="submit"
        >
          Guardar
        </button>
      </form>
    </Layout>
  );
};

export default AddCompanyPage;
