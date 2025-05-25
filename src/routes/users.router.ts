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
const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, env.VITE_JWT_SECRET!, { expiresIn: "1h" });
};

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
      res
        .status(201)
        .send(`User with id ${result.insertedId} successfully created`);
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

    const token = generateToken(user.id as unknown as string);
    res.json({ token });
  } catch (error) {
    const userError = error as Error;
    res.status(400).send(userError.message);
  }
});
