import { useRouter } from "next/router";
import React from "react";

const Header = () => {
  const router = useRouter();
  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">My App</h1>
          <div className="space-x-4">
            <button
              onClick={() => router.push("/")}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded"
            >
              Home
            </button>
            <button
              onClick={() => router.push("/add")}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white rounded"
            >
              Add User
            </button>
            <button
              onClick={() => router.push("/users")}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded"
            >
              All Users
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
