import {
  type Request,
  type Response,
  Router,
  json as ExpressJson,
} from "express";
import { genSalt, hash, compare } from "bcrypt";
import type { MongoServerError } from "mongodb";

import User, { UserWithoutPassword } from "@shared/models/user";
import { collections } from "@services/database.service";
import {
  ServerResponse,
  SignInArgs,
  SignInResponse,
  GetProfileResponse,
  SignUpArgs,
} from "@shared/types/api";

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
usersRouter.get(
  "/profile",
  (req: Request, res: Response<GetProfileResponse>) => {
    const user = req.session?.user;

    if (user) {
      res.status(200).json({
        success: true,
        user,
        message: `Retrieved user info for ${user.username}`,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "User access denied. Not logged in",
      } as ServerResponse);
    }
  },
);

usersRouter.get("/", async (_, res: Response) => {
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
usersRouter.post(
  "/sign-up",
  async (req: Request, res: Response<ServerResponse>) => {
    const { email, username, phoneNumber, firstName, lastName, password } =
      req.body as SignUpArgs;
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
      res
        .status(400)
        .json({ success: false, message: `Not all fields are filled` });
    }

    const newUser: User = {
      ...req.body,
      password: hashedPassword,
    };

    try {
      const result = await collections.users?.insertOne(newUser);

      if (result && result.acknowledged && result.insertedId) {
        res.status(201).json({
          success: true,
          message: `User ${username} created successfully!`,
        });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Failed to create user" });
      }
    } catch (error) {
      const userError = error as MongoServerError;
      console.error("USER ERROR:", userError);
      switch (userError.code) {
        // Duplicate user
        case 11000:
          if (userError.keyPattern.email && userError.keyPattern.username) {
            res.status(400).json({
              success: false,
              message: `User with email ${email} and username ${username} already exists`,
            });
          } else if (userError.keyPattern.email) {
            res.status(400).json({
              success: false,
              message: `User with email ${email} already exists`,
            });
          } else {
            res.status(400).json({
              success: false,
              message: `User with username ${username} already exists`,
            });
          }
          break;
        default:
          res.status(400).json({
            success: false,
            message: userError.errmsg,
          });
          break;
      }
    }
  },
);

usersRouter.post(
  "/sign-in",
  async (req: Request, res: Response<SignInResponse>) => {
    const { usernameOrEmail, password } = req.body as SignInArgs;

    try {
      const user = (await collections.users?.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      })) as unknown as User;

      if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
      }

      const isPasswordValid = await validatePassword({
        password,
        hashedPassword: user?.password,
      });

      if (!password || !isPasswordValid) {
        // res.status(401).send("Incorrect password");
        res.status(401).json({ success: false, message: "Incorrect password" });
        return;
      }
      const { password: _passwordToOmit, ...userWithoutPassword } = user;
      req.session.user = userWithoutPassword as UserWithoutPassword;
      res.status(200).json({
        success: true,
        sessionId: req.sessionID,
        message: `Sign in successful! Welcome back, ${user.username}`,
      });
    } catch (error) {
      const userError = error as MongoServerError;
      console.error("Sign in error:", userError);
      res.status(400).json({
        success: false,
        sessionId: req.sessionID,
        message: userError.errmsg,
      } as SignInResponse);
    }
  },
);

usersRouter.post(
  "/sign-out",
  async (req: Request, res: Response<ServerResponse>) => {
    req.session.destroy((error) => {
      if (error) {
        console.error("Error destroying session:", error);
        return res.status(500).json({
          success: false,
          message: "Sign out failed",
        } as ServerResponse);
      }
      res.status(200).json({ success: true, message: "Sign out successful" });
    });
  },
);

// Put
usersRouter.put(
  "/profile",
  async (req: Request, res: Response<ServerResponse>) => {
    const user = req.session?.user;

    if (!user) {
      res
        .status(401)
        .json({ success: false, message: "User access denied. Not logged in" });
      return;
    }

    const updatedUser = req.body as Partial<User>;

    if (updatedUser.password) {
      updatedUser.password = await getHashedPassword(updatedUser.password);
    }

    try {
      const result = await collections.users?.updateOne(
        { _id: user._id },
        { $set: updatedUser },
      );

      if (result?.modifiedCount === 1) {
        res
          .status(200)
          .json({
            success: true,
            message: "User profile updated successfully",
          });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Failed to update user profile" });
      }
    } catch (error) {
      const userError = error as MongoServerError;
      console.error("Update user error:", userError);
      res.status(500).json({ success: false, message: userError.errmsg });
    }
  },
);
