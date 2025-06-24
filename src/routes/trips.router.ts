import {
  type Request,
  type Response,
  Router,
  json as ExpressJson,
} from "express";
import { ObjectId } from "mongodb";
import { collections } from "@services/database.service";
import type Trip from "@models/trip";

export const tripsRouter = Router();
tripsRouter.use(ExpressJson());

// Get
tripsRouter.get("/", async (req: Request, res: Response) => {
  const user = req.session.user;

  if (!user) {
    res.status(403).send("Cannot retrieve trip data. Must be logged in");
    return;
  }

  const query = { userId: new ObjectId(user._id) };

  try {
    const trips = (await collections.trips
      ?.find(query)
      .toArray()) as unknown as Trip[];
    res.status(200).send(trips);
  } catch (error) {
    const tripError = error as Error;
    res.status(500).send(tripError.message);
  }
});
tripsRouter.get("/:id", async (req: Request, res: Response) => {
  const tripId = req.params.id;

  try {
    const query = { _id: new ObjectId(tripId) };
    const trip = (await collections.trips?.findOne(query)) as unknown as Trip;

    if (trip) {
      res.status(200).send(trip);
    }
  } catch (error) {
    const tripError = error as Error;
    res.status(404).send(tripError.message);
  }
});

// Post
tripsRouter.post("/", async (req: Request, res: Response) => {
  const user = req.session.user;

  if (!user) {
    res.status(403).send("Cannot create trip. Must be logged in");
    return;
  }

  const newTrip = { ...req.body, userId: user._id } as Trip;

  try {
    const result = await collections.trips?.insertOne(newTrip);

    if (result) {
      res
        .status(201)
        .send(`Successfully created new route with id ${result.insertedId}`);
    } else {
      res.status(500).send("Failed to create route");
    }
  } catch (error) {
    const tripError = error as Error;
    res.status(400).send(tripError.message);
  }
});

// Put
tripsRouter.put("/:id", async (req: Request, res: Response) => {
  const user = req.session.user;

  if (!user) {
    res.status(403).send("Cannot update trip. Must be logged in");
    return;
  }

  const tripId = req.params.id;

  try {
    const updatedTrip = req.body as Trip;
    const query = { _id: new ObjectId(tripId) };

    const result = await collections.trips?.updateOne(query, {
      $set: updatedTrip,
    });

    if (result) {
      res.status(200).send(`Successfully updated route with id ${tripId}`);
    } else {
      res.status(304).send(`Route with id ${tripId} not updated`);
    }
  } catch (error) {
    const tripError = error as Error;
    res.status(400).send(tripError.message);
  }
});

// Delete
tripsRouter.delete("/:id", async (req: Request, res: Response) => {
  const user = req.session.user;

  if (!user) {
    res.status(403).send("Cannot delete trip. Must be logged in");
  }

  const tripId = req.params.id;

  try {
    const query = { _id: new ObjectId(tripId) };
    const result = await collections.trips?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully deleted route with id ${tripId}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove route with id ${tripId}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Route with id ${tripId} does not exist`);
    }
  } catch (error) {
    const tripError = error as Error;
    res.status(400).send(tripError.message);
  }
});
