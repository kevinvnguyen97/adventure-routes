import {
  type Request,
  type Response,
  Router,
  json as ExpressJson,
} from "express";
import { genSalt, hash, compare } from "bcrypt";
import * as jwt from "jsonwebtoken";

import env from "@constants/env";
import type User from "@models/user.d.ts";
import { collections } from "@services/database.service";

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
const generateToken = (user: User) => {
  return jwt.sign({ userId: user.id }, env.VITE_JWT_SECRET!, {
    algorithm: "PS256",
    expiresIn: "1h",
  });
};

// Get
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
    const userError = error as Error;
    res.status(500).send(userError.message);
  }
});

// Post
usersRouter.post("/register", async (req: Request, res: Response) => {
  const { password } = req.body as User;
  const hashedPassword = await getHashedPassword(password);

  const newUser: User = {
    ...(req.body as User),
    password: hashedPassword,
  };

  try {
    const result = await collections.users?.insertOne(newUser);

    if (result) {
      const token = generateToken(newUser);
      res.json({ token });
    } else {
      res.status(500).send(`Failed to create user`);
    }
  } catch (error) {
    const userError = error as Error;
    res.status(400).send(userError.message);
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

    const token = generateToken(user);
    console.log("TOKEN:", token);
    res.json({ token });
  } catch (error) {
    const userError = error as Error;
    res.status(400).send(userError.message);
  }
});
