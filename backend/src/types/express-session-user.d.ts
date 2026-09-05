import type { UserWithoutPassword } from "@shared/models/user";

declare module "express-session" {
  interface SessionData {
    user: UserWithoutPassword;
  }
}
