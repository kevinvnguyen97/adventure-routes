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
      ?.find({}, { projection: { password: 0 } })
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
  const { email, username, phoneNumber, firstName, lastName, password } =
    req.body as User;
  const hashedPassword = await getHashedPassword(password);

  const areAllFieldsFilled = [
    email,
    username,
    firstName,
    lastName,
    password,
    phoneNumber,
  ].every(Boolean);

  if (!areAllFieldsFilled) {
    res.status(400).send(`Not all fields are filled`);
  }

  const newUser: User = {
    ...(req.body as User),
    password: hashedPassword,
  };

  try {
    const result = await collections.users?.insertOne(newUser);

    if (result) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _passwordToOmit, ...userWithoutPassword } = newUser;
      req.session.user = userWithoutPassword as UserWithoutPassword;
      res.status(200).send(`User created successfully! Welcome, ${username}`);
    } else {
      res.status(500).send(`Failed to create user`);
    }
  } catch (error) {
    const userError = error as MongoServerError;
    console.error("USER ERROR:", userError);
    switch (userError.code) {
      // Duplicate user
      case 11000:
        if (userError.keyPattern.email && userError.keyPattern.username) {
          res
            .status(400)
            .send(
              `User with email ${email} and username ${username} already exists`
            );
        } else if (userError.keyPattern.email) {
          res.status(400).send(`User with email ${email} already exists`);
        } else {
          res.status(400).send(`User with username ${username} already exists`);
        }
        break;
      default:
        res.status(400).send(userError.errmsg);
        break;
    }
  }
});

usersRouter.post("/login", async (req: Request, res: Response) => {
  const { usernameOrEmail, password } = req.body as {
    usernameOrEmail: string;
    password: string;
  };

  try {
    const user = (await collections.users?.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    })) as unknown as User;

    if (!user) {
      res.status(404).send(`User not found`);
    }

    const isPasswordValid = await validatePassword({
      password,
      hashedPassword: user?.password,
    });

    if (!password || !isPasswordValid) {
      res.status(401).send("Incorrect password");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _passwordToOmit, ...userWithoutPassword } = user;
    req.session.user = userWithoutPassword as UserWithoutPassword;
    res.status(200).send(`Login successful! Welcome back, ${user?.username}`);
  } catch (error) {
    const userError = error as MongoServerError;
    console.error("Login error:", userError);
    res.status(400).send(userError.errmsg);
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

// Put
usersRouter.put("/profile", async (req: Request, res: Response) => {
  const user = req.session?.user;

  if (!user) {
    res.status(401).send("User access denied. Not logged in");
    return;
  }

  const updatedUser = req.body as Partial<User>;

  if (updatedUser.password) {
    updatedUser.password = await getHashedPassword(updatedUser.password);
  }

  try {
    const result = await collections.users?.updateOne(
      { _id: user._id },
      { $set: updatedUser }
    );

    if (result?.modifiedCount === 1) {
      res.status(200).send("User profile updated successfully");
    } else {
      res.status(400).send("Failed to update user profile");
    }
  } catch (error) {
    const userError = error as MongoServerError;
    console.error("Update user error:", userError);
    res.status(500).send(userError.errmsg);
  }
});
