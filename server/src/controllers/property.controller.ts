import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { User, Property } from "../models";

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { cloudinaryV2 } from "../utils";


// interface ParsedQs {
//     _end: number;
//     _order: number;
//     _start: number;
//     _sort: string;
//     title_like: string;
//     propertyType: string;
// }

const getAllProperties = async (req: Request, res: Response) => {
//   const http_query: {
    
//   } = req.query as ParsedQs

  const {
    _end,
    _order,
    _start,
    _sort,
    title_like = "",
    propertyType = "",
  } = req.query;

  const query: {
    propertyType?: any;
    title?: any;
  } = {};

  if (propertyType !== "") {
    query.propertyType = propertyType;
  }

  if (title_like) {
    query.title = { $regex: title_like, $options: "i" };
  }

  try {
    const count = await Property.countDocuments({ query });
    const sort : { [key: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] | undefined]: number } = { [_sort]: Number(_order) }
    const properties = await Property.find(query)
      .limit(Number(_end))
      .skip(Number(_start))
      .sort({ [_sort]: Number(_order) });

    res.header("x-total-count", String(count));
    res.header("Access-Control-Expose-Headers", "x-total-count");

    res.status(200).json(properties);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getPropertyDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const propertyExists = await Property.findOne({ _id: id }).populate(
    "creator"
  );

  if (propertyExists) {
    res.status(200).json(propertyExists);
  } else {
    res.status(404).json({ message: "Property not found" });
  }
};

const createProperty = async (req: Request, res: Response) => {
  try {
    const { title, description, propertyType, location, price, photo, email } =
      req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error("User not found");

    const photoUrl = await cloudinaryV2.uploader.upload(photo);

    const newProperty = await Property.create({
      title,
      description,
      propertyType,
      location,
      price,
      photo: photoUrl.url,
      creator: user._id,
    });

    user.allProperties.push(newProperty._id);
    await user.save({ session });

    await session.commitTransaction();

    res
      .status(StatusCodes.OK)
      .json({ message: "Property created successfully" });
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const updateProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, propertyType, location, price, photo } =
      req.body;

    const photoUrl = await cloudinaryV2.uploader.upload(photo);

    await Property.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        propertyType,
        location,
        price,
        photo: photoUrl.url || photo,
      }
    );

    res.status(200).json({ message: "Property updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const propertyToDelete = await Property.findById({ _id: id }).populate(
      "creator"
    );

    if (!propertyToDelete) throw new Error("Property not found");

    const session = await mongoose.startSession();
    session.startTransaction();

    propertyToDelete.remove({ session });
    propertyToDelete.creator.allProperties.pull(propertyToDelete);

    await propertyToDelete.creator.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllProperties,
  getPropertyDetail,
  createProperty,
  updateProperty,
  deleteProperty,
};
