import { connectDb } from "@/utils/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";

type Data = {
  message: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userId } = req.query;

  try {
    await connectDb();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error connecting to the database" });
  }

  switch (req.method) {
    case "GET":
      try {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User found", data: user });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching user data" });
      }
    case "POST":
      // Handle the POST request here if needed
      return res.status(200).json({ message: "POST request received" });
    case "PUT":
      try {
        const userData = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, userData, {
          new: true,
        });
        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }
        return res
          .status(200)
          .json({ message: "User updated", data: updatedUser });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating user" });
      }
    case "DELETE":
      try {
        const deletedUser = await User.findByIdAndRemove(userId);
        if (!deletedUser) {
          return res.status(404).json({ message: "User not found" });
        }
        const users = await User.find();
        return res.status(200).json({ message: "User deleted", data: users });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting user" });
      }
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
