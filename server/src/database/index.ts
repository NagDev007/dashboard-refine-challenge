/* eslint-disable import/prefer-default-export */
import mongoose from "mongoose";
import { UrlInterface } from "../interfaces";

const connectDB = ({ url }: UrlInterface): Promise<typeof mongoose> => {
  mongoose.set("strictQuery", true);

  return mongoose.connect(url, {
    retryWrites: true,
    w: "majority",
  });
};

export { connectDB };
