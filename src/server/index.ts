import express from "express";
import session from "express-session";
import * as cors from "cors";

import { connectToDatabase } from "@services/database.service.ts";
import { tripsRouter } from "@routes/trips.router.ts";
import { usersRouter } from "@routes/users.router.ts";

const app = express();
const port = 8080;
app.use(cors.default());
app.use(
  session({
    secret: "my-secret",
    resave: false,
    // Logout after 30 minutes of inactivity
    cookie: { secure: false, maxAge: 1800000 },
    saveUninitialized: false,
    rolling: true,
  })
);
app.set("json spaces", 2);

const startDatabase = async () => {
  try {
    await connectToDatabase();

    app.use("/trips", tripsRouter);
    app.use("/users", usersRouter);

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit();
  }
};

startDatabase();
