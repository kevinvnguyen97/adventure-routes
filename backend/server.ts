import "dotenv/config";

import express from "express";
import session from "express-session";
import * as cors from "cors";

import { connectToDatabase } from "@services/database.service";
import { tripsRouter } from "@routes/trips.router";
import { usersRouter } from "@routes/users.router";

const app = express();
const port = 8088;
const host = "0.0.0.0";
app.use(cors.default());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    // Sign out after 30 minutes of inactivity
    cookie: { secure: false, maxAge: 1800000 },
    saveUninitialized: false,
    rolling: true,
  }),
);
app.set("json spaces", 2);

const startDatabase = async () => {
  try {
    await connectToDatabase();

    app.use("/trips", tripsRouter);
    app.use("/users", usersRouter);

    const server = app.listen(port, host, () => {
      console.log(`Server started at http://{host}:${port}`);
    });

    console.log("Database connection established successfully.");
    console.log(server.address());
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit();
  }
};

startDatabase();
