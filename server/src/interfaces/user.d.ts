import { Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  avatar: string;
  allProperties: string[];
}

export interface IUserModel extends IUser, Document {}
