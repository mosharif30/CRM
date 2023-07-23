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
  console.log(router);

  const { userId, isEdit } = router.query;

  const [data, setData] = useState<IUser | null>(null);
  const [isEditing, setIsEditing] = useState(false); // State to determine if in edit mode
  const [editedData, setEditedData] = useState<IUser | null>(null); // State to hold edited data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: IUser }>(
          `/api/users/${userId}`
        );
        setData(response.data.data);

        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        // Any code you want to execute after the request (optional)
      }
    };

    fetchData();
  }, [userId]);

  const handleEditClick = () => {
    // Enable edit mode and initialize editedData with the current data
    setIsEditing(true);
    setEditedData(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // To handle nested properties, split the name using '.' and update the nested property correctly
    const nameParts = name.split(".");
    if (nameParts.length === 1) {
      // If the property is not nested, update it directly
      setEditedData((prevData) => ({
        ...prevData!,
        [name]: value,
      }));
    } else if (nameParts.length === 2) {
      // If the property is nested one level deep
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
      // Send a PUT request to update the user data
      await axios.put(`/api/users/${userId}`, editedData);
      // Update the original data state with the edited data
      setData(editedData);
      // Disable edit mode
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelClick = async () => {
    setIsEditing(false);
  };
  const handleDeleteClick = async () => {
    try {
      // Send a PUT request to update the user data
      await axios.delete(`/api/users/${userId}`);
      router.push("/users");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="table-container">
      <button onClick={() => router.push("/users")}>Show all users</button>

      {data && (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Street</th>
              <th>Alley</th>
              <th>created At</th>
              <th>Actions</th>
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
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="age"
                    value={editedData?.age}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="email"
                    value={editedData?.email}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="phone"
                    value={editedData?.phone}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="address.city"
                    value={editedData?.address.city}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="address.street"
                    value={editedData?.address.street}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="address.alley"
                    value={editedData?.address.alley}
                    onChange={handleInputChange}
                  />
                </td>
                <td>{editedData?.createdAt}</td>
                <td>
                  <button onClick={handleSaveClick}>Save</button>
                  <button onClick={handleCancelClick}>Cancel</button>
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
                  <button onClick={handleEditClick}>Edit</button>
                  <button onClick={handleDeleteClick}>Delete</button>
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
