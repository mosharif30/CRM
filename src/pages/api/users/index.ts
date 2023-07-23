// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDb } from "@/utils/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";

type UserData = {
  name: string;
  phone: number;
  age?: number;
};

type ApiResponse<T> = {
  message: string;
  data?: T;
};

async function connectToDatabase() {
  try {
    await connectDb();
  } catch (error) {
    console.log(error);
    throw new Error("Error connecting to the database");
  }
}

async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<UserData>>
) {
  const data: UserData = req.body;

  if (!data.name || data.name.length <= 3) {
    return res.status(422).json({
      message: "Wrong data",
    });
  }

  try {
    const user = await User.create(data);
    return res
      .status(200)
      .json({ message: "Data stored successfully", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error storing data" });
  }
}

async function getHandler(
  _req: NextApiRequest,
  res: NextApiResponse<ApiResponse<UserData[]>>
) {
  try {
    const users = await User.find();
    return res
      .status(200)
      .json({ message: "Data retrieved successfully", data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error retrieving data" });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<any>>
) {
  await connectToDatabase();

  if (req.method === "POST") {
    return postHandler(req, res);
  } else if (req.method === "GET") {
    return getHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
