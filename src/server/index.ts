import express from "express";
import session from "express-session";
import * as cors from "cors";

import { connectToDatabase } from "../services/database.service.ts";
import { routesRouter } from "../routes/routes.router.ts";
import { usersRouter } from "../routes/users.router.ts";

const app = express();
const port = 8080;
app.use(cors.default());
app.use(
  session({
    secret: "my-secret",
    resave: false,
    cookie: { secure: false, maxAge: 3600000 },
    saveUninitialized: false,
  })
);

const startDatabase = async () => {
  try {
    await connectToDatabase();

    app.use("/routes", routesRouter);
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
