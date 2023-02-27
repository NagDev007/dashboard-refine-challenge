import { Document } from "mongoose";

export interface IProperty {
  title: string;
  description: string;
  propertyType: string;
  location: string;
  price: number;
  photo: string;
  creator: string;
}

export interface IPropertyModel extends IProperty, Document {}
