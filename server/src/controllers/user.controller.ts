import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../models";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).limit(Number(req.query._end));

    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, avatar } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) return res.status(200).json(userExists);

    const newUser = await User.create({
      name,
      email,
      avatar,
    });

    res.status(200).json(newUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getUserInfoByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id }).populate("allProperties");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, createUser, getUserInfoByID };
