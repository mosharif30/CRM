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
  try {
    connectDb();
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "error to connect db" });
  }
  if (req.method === "POST") {
    const data = req.body;

    if (!data.name || data.name.length <= 3) {
      res.status(422).json({
        massage: "wrong data",
      });
    } else {
      try {
        console.log(data);
        const user = await User.create(data);
        res.status(200).json({ massage: "done", data: user });
      } catch (error) {
        console.log(error);
        res.status(500).json({ massage: "error to store data" });
      }
    }
  } else if (req.method === "GET") {
    const users = await User.find();
    res.status(200).json({ massage: "done", data: users });
  }
}
