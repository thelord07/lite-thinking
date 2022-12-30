
import { useContext, useEffect } from 'react';
import { useRouter } from "next/router";
import { AuthContext } from "../context";

export default function Home() {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(()=>{
    if (isLoggedIn) {
      router.replace("/admin");
    }
    router.push('/auth/login')
  },[])

  

  

  return (
    <h1 className="text-3xl font-bold underline">
    </h1>
  )
}
