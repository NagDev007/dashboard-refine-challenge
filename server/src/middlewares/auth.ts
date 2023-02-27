import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { defaultConfiguration } from "../configs";
import { Logging } from "../lib";

const auth = async (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    Logging.error("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload: any = jwt.verify(token, defaultConfiguration.jwt.access);
    // eslint-disable-next-line no-underscore-dangle
    req.user = { userId: payload._id };
    next();
  } catch (error) {
    Logging.error(`Message: Authentication Invalid - Error: ${error}`);
  }
};

export default auth;
