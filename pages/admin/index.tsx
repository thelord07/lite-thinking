import React, {useContext} from 'react'
import Layout from '../../components/layouts/Layout'
import UserData from '../../components/ui/UserData';
import UsersList from '../../components/ui/UsersList'
import { AuthContext } from "../../context";

const AdminPage = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  return (
    <Layout>
      {isLoggedIn && user?.role === 'admin' ? <UsersList/> : <UserData/> }
      
        
    </Layout>
  )
}

export default AdminPage