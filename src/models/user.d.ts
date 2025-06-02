import { ObjectId } from "mongodb";

export default interface User {
  id: ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  profilePictureUrl?: string;
}

export type UserWithoutPassword = Omit<User, "password">;
