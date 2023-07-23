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
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        // Any code you want to execute after the request (optional)
      }
    };

    fetchData();
  }, []);
  const handleDeleteClick = async (userId: any) => {
    try {
      // Send a PUT request to update the user data
      const response = await axios.delete(`/api/users/${userId}`);
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
    <div className="table-container">
      <button onClick={() => router.push("/")}>Add User</button>
      <table className="data-table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Phone</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>

              <td>
                <button onClick={() => router.push(`/users/${item._id}`)}>
                  more details
                </button>
                <button onClick={() => handleDeleteClick(item._id)}>
                  Delete
                </button>
                <button onClick={() => handleEditClick(item._id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
