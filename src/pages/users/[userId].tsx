import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface IUser {
  _id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  address: {
    city: string;
    street: string;
    alley: string;
  };
  createdAt: string;
  [key: string]: any;
}

function User() {
  const router = useRouter();
  const { userId, isEdit } = router.query;

  const [data, setData] = useState<IUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: IUser }>(
          `/api/users/${userId}`
        );
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userId]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedData(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nameParts = name.split(".");
    if (nameParts.length === 1) {
      setEditedData((prevData) => ({
        ...prevData!,
        [name]: value,
      }));
    } else if (nameParts.length === 2) {
      setEditedData((prevData) => ({
        ...prevData!,
        [nameParts[0]]: {
          ...prevData![nameParts[0]],
          [nameParts[1]]: value,
        },
      }));
    }
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`/api/users/${userId}`, editedData);
      setData(editedData);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`/api/users/${userId}`);
      router.push("/users");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {data && (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">City</th>
              <th className="px-4 py-2">Street</th>
              <th className="px-4 py-2">Alley</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isEditing ? (
              <tr>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={editedData?.name}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="age"
                    value={editedData?.age}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="email"
                    value={editedData?.email}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="phone"
                    value={editedData?.phone}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="address.city"
                    value={editedData?.address.city}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="address.street"
                    value={editedData?.address.street}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="address.alley"
                    value={editedData?.address.alley}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td>{editedData?.createdAt}</td>
                <td>
                  <button
                    className="bg-green-500 text-white font-bold py-1 px-2 rounded shadow mr-2"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-500 text-white font-bold py-1 px-2 rounded shadow"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr>
                <td>{data.name}</td>
                <td>{data.age}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.address.city}</td>
                <td>{data.address.street}</td>
                <td>{data.address.alley}</td>
                <td>{data.createdAt}</td>
                <td>
                  <button
                    className="bg-yellow-500 text-white font-bold py-1 px-2 rounded shadow mr-2"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white font-bold py-1 px-2 rounded shadow"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default User;
