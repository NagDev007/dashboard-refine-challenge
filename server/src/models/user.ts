import mongoose, { Document, Schema } from "mongoose";
import { IUserModel } from "../interfaces";

const { model } = mongoose;

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  avatar: { type: String, required: true, trim: true },
  allProperties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
});

const User = model<IUserModel>(`User`, UserSchema);

export default User;
