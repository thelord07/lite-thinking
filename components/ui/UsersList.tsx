import { useState, useEffect } from "react";
import useSWR from "swr";
import { IUser } from "../../interfaces";
import { liteApi } from "../../api";

const UsersList = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/users");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);
  if (!data && !error) return <></>;

  const onRoleUpdated = async (userId: string, newRole: string) => {
    const previosUsers = users.map((user) => ({ ...user }));
    const updatedUsers = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }));

    setUsers(updatedUsers);

    try {
      await liteApi.put("/admin/users", { userId, role: newRole });
    } catch (error) {
      setUsers(previosUsers);
      console.log(error);
      alert("No se pudo actualizar el role del usuario");
    }
  };

  return (
    <>
      <h1 className="mb-5">Usuarios</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
            >
              Edit
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
            >
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users?.map((user, index) => (
            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                {user._id}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {user.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {user.email}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                <a className="text-green-500 hover:text-green-700" href="#">
                  Edit
                </a>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                <a className="text-red-500 hover:text-red-700" href="#">
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersList;
