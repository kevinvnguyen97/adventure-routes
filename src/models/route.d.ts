import { ObjectId } from "mongodb";

export default interface Route {
  id: ObjectId;
  name: string;
  priceCategory: string;
  waypoints: {
    origin: string;
    stops?: string[];
    destination: string;
  };
  description?: string;
  activities?: string[];
  isPublic?: boolean;
}
