import type { UserWithoutPassword } from "@models/user";

declare module "express-session" {
  interface SessionData {
    user: UserWithoutPassword;
  }
}
