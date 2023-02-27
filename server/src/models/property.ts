import mongoose, { Schema } from "mongoose";
import { IPropertyModel } from "../interfaces";

const { model } = mongoose;

const PropertySchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  propertyType: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  photo: { type: String, required: true, trim: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

const Property = model<IPropertyModel>(`Property`, PropertySchema);

export default Property;
