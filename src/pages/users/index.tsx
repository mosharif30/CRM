import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
}

const Users = () => {
  const [data, setData] = useState<User[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: User[] }>("/api/users");
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = async (userId: any) => {
    try {
      // Send a DELETE request to delete the user data
      await axios.delete(`/api/users/${userId}`);
      // After deletion, fetch the updated user data
      const response = await axios.get<{ data: User[] }>("/api/users");
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = async (itemId: any) => {
    router.push({
      pathname: `/users/${itemId}`,
      query: { isEdit: true },
    });
  };

  return (
    <div className="p-4">
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Number</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr
              key={item._id}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
              } hover:bg-gray-200`}
            >
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.age}</td>
              <td className="border px-4 py-2">{item.email}</td>
              <td className="border px-4 py-2">{item.phone}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => router.push(`/users/${item._id}`)}
                >
                  More Details
                </button>

                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleEditClick(item._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded ml-2"
                  onClick={() => handleDeleteClick(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
