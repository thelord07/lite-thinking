import { useState, useContext } from "react";
import { GetServerSideProps } from 'next'
import { useForm } from "react-hook-form";
import { signIn, getSession, getProviders } from 'next-auth/react';

import { AuthContext } from "../../context";
import AuthLayout from "../../components/layouts/AuthLayout";
import { validations } from "../../utils";
import { useRouter } from "next/router";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { loginUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    await signIn('credentials',{ email, password });
  };
  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit(onLoginUser)}
        noValidate
        className="w-full flex  justify-center"
      >
        <div className="bg-white md:w-1/3 w-[90%] rounded-xl p-6 text-center ">
          <h1 className="m-3 font-bold text-lg">Login</h1>
          {showError && <div className=" text-red-500 p-3 ">Email o contraseña invalida</div>}
          <section>
            <div className="grid mb-6 gap-4">
              <div className="flex w-full flex-col">
                <label
                  htmlFor="email"
                  className="block  text-sm font-medium text-start "
                >
                  E-mail
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Este campo es requerido",
                    validate: validations.isEmail,
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 bg-slate-200 border-slate-200 placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.email && <span>{errors.email?.message}</span>}
              </div>

              <div className="grid mb-6">
                <div className="flex w-full flex-col">
                  <label
                    htmlFor="password"
                    className="block  text-sm font-medium text-start "
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Este campo es requerido",
                      minLength: { value: 6, message: "Mínimo 6 caracteres" },
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 bg-slate-200 border-slate-200 placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.password && <span>{errors.password?.message}</span>}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Ingresar
            </button>
          </section>
        </div>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
  const session = await getSession({ req });
  const { p = '/admin' } = query;

  if ( session ) {
      return {
          redirect: {
              destination: p.toString(),
              permanent: false
          }
      }
  }


  return {
      props: { }
  }
}

export default LoginPage;
