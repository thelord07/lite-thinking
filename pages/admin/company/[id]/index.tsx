import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import Layout from "../../../../components/layouts/Layout";
import liteApi from "../../../../api/liteApi";
import { useRouter } from "next/router";
import { ICompany } from "../../../../interfaces";
import { NextPage } from "next";

type FormData = {
  name: string;
  direction: string;
  nit: string;
  phone: number;
};

const EditCompanyPage:NextPage = () => {

  const router = useRouter();


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<FormData>();
  const [showError, setShowError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [company, setCompany] = useState<any>();

  const onSaveCompany = async ({ name, direction, nit, phone }: FormData) => {
    setShowError(false);
    const { id } = router.query
    const saveCompany = await liteApi({
      url: `/admin/companies?id=${id}`,
      method: "PUT",
      data: {
        name,
        direction,
        nit,
        phone
      },
    });
    if (saveCompany.status === 200) {
      setMessage(saveCompany.data.message);
      reset();
      window.location.href = "/admin"
    }
  };

  const getCompany = async () => {
    const { id } = router.query
    if (id === undefined) {
      return;
    }
    const { data } = await liteApi({ url: `/admin/company/?id=${id}`, method:'GET' });
    console.log({data })
    setCompany( data )
  };

  useEffect(() => {
    getCompany();
  }, [router]);

 useEffect(() => {
   setValue("direction", company?.direction)
   setValue("name", company?.name)
   setValue("nit", company?.nit)
   setValue("phone", company?.phone)
 }, [company])
 

  

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
            required: "Este campo es requerido"
          })
        }
         
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
          Editar
        </button>
      </form>
    </Layout>
  );
};

export default EditCompanyPage;
