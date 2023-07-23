// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDb } from "@/utils/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";

type Data = {
  massage: string;
  // data?: { name: string; phone: number; age?: number };
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userId } = req.query;
  try {
    connectDb();
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "error to connect db" });
  }
  if (req.method === "POST") {
    console.log("hi");
  } else if (req.method === "GET") {
    const user = await User.findById(userId);
    res.status(200).json({ massage: "done", data: user });
  } else if (req.method === "PUT") {
    const userData = req.body;
    await User.findByIdAndUpdate(userId, userData);
    res.status(200).json({ massage: "done", data: userData });
  } else if (req.method === "DELETE") {
    try {
      const deletedUser = await User.findByIdAndRemove(userId);
      if (!deletedUser) {
        return res.status(404).json({ massage: "User not found" });
      }

      const users = await User.find();
      res
        .status(200)
        .json({ massage: "User deleted successfully", data: users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ massage: "Error deleting user" });
    }
  }
}
