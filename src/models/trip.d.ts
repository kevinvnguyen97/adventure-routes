import { ObjectId } from "mongodb";

export default interface Trip {
  _id: ObjectId;
  name: string;
  priceCategory: number;
  waypoints: string[];
  description?: string;
  activities?: string[];
  isPublic?: boolean;
}
