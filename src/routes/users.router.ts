import {
  type Request,
  type Response,
  Router,
  json as ExpressJson,
} from "express";
import { genSalt, hash, compare } from "bcrypt";
import type { MongoServerError } from "mongodb";

import type User from "@models/user.d.ts";
import { collections } from "@services/database.service";
import type { UserWithoutPassword } from "@models/user.d.ts";

export const usersRouter = Router();
usersRouter.use(ExpressJson());

const getHashedPassword = async (password: string) => {
  const salt = await genSalt(10);
  const passwordHash = await hash(password, salt);
  return passwordHash;
};
const validatePassword = async (args: {
  password: string;
  hashedPassword: string;
}) => {
  const { password, hashedPassword } = args;
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

// Get
usersRouter.get("/profile", (req: Request, res: Response) => {
  const user = req.session?.user;

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).send("User access denied. Not logged in");
  }
});

usersRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const users = (await collections.users
      ?.find({})
      .toArray()) as unknown as User[];
    if (users) {
      res.json(users);
    } else {
      res.status(404).send("No users found");
    }
  } catch (error) {
    const userError = error as MongoServerError;
    res.status(500).send(userError.errmsg);
  }
});

// Post
usersRouter.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body as User;
  const hashedPassword = await getHashedPassword(password);

  const newUser: User = {
    ...(req.body as User),
    password: hashedPassword,
  };

  try {
    const result = await collections.users?.insertOne(newUser);

    if (result) {
      const { password, ...userWithoutPassword } = newUser;
      req.session.user = userWithoutPassword as UserWithoutPassword;
      res.status(200).send(`User created successfully! Welcome, ${username}`);
    } else {
      res.status(500).send(`Failed to create user`);
    }
  } catch (error) {
    const userError = error as MongoServerError;
    console.error("USER ERROR:", userError);
    res.status(400).send(userError.errmsg);
  }
});

usersRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body as User;

  try {
    const user = (await collections.users?.findOne({
      username,
    })) as unknown as User;

    const isPasswordValid = await validatePassword({
      password,
      hashedPassword: user.password,
    });

    if (!password || !user || !isPasswordValid) {
      res.status(401).send("Invalid credentials");
      return;
    }

    const { password: passwordToOmit, ...userWithoutPassword } = user;
    req.session.user = userWithoutPassword as UserWithoutPassword;
    res.status(201).send(`Login successful! Welcome back, ${username}`);
  } catch (error) {
    const userError = error as Error;
    console.error("Login error:", userError.message);
    res.status(400).send(userError.message);
  }
});

usersRouter.post("/logout", async (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Error destroying session:", error);
      return res.status(500).send("Logout failed");
    }
    res.status(200).send("Logout successful");
  });
});
