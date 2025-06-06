import { ObjectId } from "mongodb";

export default interface Route {
  id: ObjectId;
  name: string;
  priceCategory: string;
  waypoints: string[];
  description?: string;
  activities?: string[];
  isPublic?: boolean;
}
