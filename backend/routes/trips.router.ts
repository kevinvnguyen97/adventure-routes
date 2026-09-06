import {
  type Request,
  type Response,
  Router,
  json as ExpressJson,
} from "express";
import { ObjectId } from "mongodb";
import { collections } from "@services/database.service";
import type Trip from "@shared/models/trip";
import {
  GetTripResponse,
  GetTripsResponse,
  ServerResponse,
} from "@shared/types/api";

export const tripsRouter = Router();
tripsRouter.use(ExpressJson());

type TripRequestParams = {
  id: string;
};

// Get
tripsRouter.get("/", async (req: Request, res: Response<GetTripsResponse>) => {
  const user = req.session.user;

  if (!user) {
    res.status(403).json({
      success: false,
      message: "Cannot retrieve trip data. Must be logged in",
    });
    return;
  }

  const query = { userId: new ObjectId(user._id) };

  try {
    const trips = (await collections.trips
      ?.find(query)
      .toArray()) as unknown as Trip[];
    res.status(200).json({
      success: true,
      message: "Trips found",
      trips,
    });
  } catch (error) {
    const tripError = error as Error;
    res.status(500).json({
      success: false,
      message: tripError.message,
    });
  }
});
tripsRouter.get(
  "/:id",
  async (req: Request<TripRequestParams>, res: Response<GetTripResponse>) => {
    const tripId = req.params.id;

    try {
      const query = { _id: new ObjectId(tripId) };
      const trip = (await collections.trips?.findOne(query)) as unknown as Trip;

      if (trip) {
        res.status(200).json({
          success: true,
          message: "Trip found",
          trip,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Trip not found",
        });
      }
    } catch (error) {
      const tripError = error as Error;
      res.status(404).json({
        success: false,
        message: tripError.message,
      });
    }
  },
);

// Post
tripsRouter.post("/", async (req: Request, res: Response<ServerResponse>) => {
  const user = req.session.user;

  if (!user) {
    res.status(403).json({
      success: false,
      message: "Cannot create trip. Must be logged in",
    });
    return;
  }

  const newTrip = { ...req.body, userId: new ObjectId(user._id) } as Trip;

  try {
    const result = await collections.trips?.insertOne(newTrip);

    if (result && result.acknowledged && result.insertedId) {
      res.status(201).json({
        success: true,
        message: `Successfully created new route with id ${result.insertedId}`,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to create route",
      });
    }
  } catch (error) {
    const tripError = error as Error;
    res.status(400).json({
      success: false,
      message: tripError.message,
    });
  }
});

// Put
tripsRouter.put(
  "/:id",
  async (req: Request<TripRequestParams>, res: Response<ServerResponse>) => {
    const user = req.session.user;

    if (!user) {
      res.status(403).json({
        success: false,
        message: "Cannot update trip. Must be logged in",
      });
      return;
    }

    const tripId = req.params.id;

    try {
      const updatedTrip = req.body as Trip;
      const query = { _id: new ObjectId(tripId) };

      const result = await collections.trips?.updateOne(query, {
        $set: updatedTrip,
      });

      if (result && result.acknowledged && result.modifiedCount) {
        res.status(200).json({
          success: true,
          message: `Successfully updated route with id ${tripId}`,
        });
      } else {
        res.status(304).json({
          success: false,
          message: `Route with id ${tripId} not updated`,
        });
      }
    } catch (error) {
      const tripError = error as Error;
      res.status(400).json({
        success: false,
        message: tripError.message,
      });
    }
  },
);

// Delete
tripsRouter.delete(
  "/:id",
  async (req: Request<TripRequestParams>, res: Response<ServerResponse>) => {
    const user = req.session.user;

    if (!user) {
      res.status(403).json({
        success: false,
        message: "Cannot delete trip. Must be logged in",
      });
      return;
    }

    const tripId = req.params.id;

    try {
      const query = { _id: new ObjectId(tripId) };
      const result = await collections.trips?.deleteOne(query);

      if (result && result.deletedCount) {
        res.status(200).json({
          success: true,
          message: `Successfully deleted route with id ${tripId}`,
        });
      } else if (!result) {
        res.status(400).json({
          success: false,
          message: `Failed to remove route with id ${tripId}`,
        });
      } else if (!result.deletedCount) {
        res.status(404).json({
          success: false,
          message: `Route with id ${tripId} does not exist`,
        });
      }
    } catch (error) {
      const tripError = error as Error;
      res.status(400).json({
        success: false,
        message: tripError.message,
      });
    }
  },
);
