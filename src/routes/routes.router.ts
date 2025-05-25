import {
  type Request,
  type Response,
  Router,
  json as ExpressJson,
} from "express";
import { ObjectId } from "mongodb";
import { collections } from "@services/database.service";
import type Route from "@models/route.d.ts";

export const routesRouter = Router();
routesRouter.use(ExpressJson());

// Get
routesRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const routes = (await collections.routes
      ?.find({})
      .toArray()) as unknown as Route[];
    res.status(200).send(routes);
  } catch (error) {
    const routeError = error as Error;
    res.status(500).send(routeError.message);
  }
});
routesRouter.get("/:id", async (req: Request, res: Response) => {
  const routeId = req.params.id;

  try {
    const query = { _id: new ObjectId(routeId) };
    const route = (await collections.routes?.findOne(
      query
    )) as unknown as Route;

    if (route) {
      res.status(200).send(route);
    }
  } catch (error) {
    const routeError = error as Error;
    res.status(404).send(routeError.message);
  }
});

// Post
routesRouter.post("/", async (req: Request, res: Response) => {
  const newRoute = req.body as Route;

  try {
    const result = await collections.routes?.insertOne(newRoute);

    if (result) {
      res
        .status(201)
        .send(`Successfully created new route with id ${result.insertedId}`);
    } else {
      res.status(500).send("Failed to create route");
    }
  } catch (error) {
    const routeError = error as Error;
    res.status(400).send(routeError.message);
  }
});

// Put
routesRouter.put("/:id", async (req: Request, res: Response) => {
  const routeId = req.params.id;

  try {
    const updatedRoute = req.body as Route;
    const query = { _id: new ObjectId(routeId) };

    const result = await collections.routes?.updateOne(query, {
      $set: updatedRoute,
    });

    if (result) {
      res.status(200).send(`Successfully updated route with id ${routeId}`);
    } else {
      res.status(304).send(`Route with id ${routeId} not updated`);
    }
  } catch (error) {
    const routeError = error as Error;
    res.status(400).send(routeError.message);
  }
});

// Delete
routesRouter.delete("/:id", async (req: Request, res: Response) => {
  const routeId = req.params.id;

  try {
    const query = { _id: new ObjectId(routeId) };
    const result = await collections.routes?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully deleted route with id ${routeId}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove route with id ${routeId}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Route with id ${routeId} does not exist`);
    }
  } catch (error) {
    const routeError = error as Error;
    res.status(400).send(routeError.message);
  }
});
