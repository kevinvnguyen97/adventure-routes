import { ObjectId } from "mongodb";

export default interface User {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  password: string;
  email: string;
  profilePictureUrl?: string;
}

export type UserWithoutPassword = Omit<User, "password">;
