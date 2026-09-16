import { type Request, Router, json as ExpressJson, Response } from "express";
import {
  ComputeRoutesArgs,
  GoogleComputeRoutesResponse,
  ComputeRoutesResponse,
} from "@shared/types/google";
import axios, { AxiosResponse } from "axios";

type FormattedComputeRoutesArgs = {
  origin: { address: string };
  destination: { address: string };
  intermediates?: { address: string }[];
  travelMode: string;
};

export const googleRouter = Router();
googleRouter.use(ExpressJson());

const googleMapsAxiosInstance = axios.create({
  baseURL: "https://routes.googleapis.com",
  timeout: 10000,
  headers: {
    "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
  },
});

googleRouter.post(
  "/compute-routes",
  async (
    req: Request<{}, {}, ComputeRoutesArgs>,
    res: Response<ComputeRoutesResponse>,
  ) => {
    const { waypoints, travelMode } = req.body;

    const origin = waypoints[0];
    const destination = waypoints[waypoints.length - 1];
    const intermediateWaypoints = waypoints.slice(1, -1);

    // @ts-expect-error Figuring out travel mode
    const formattedArgs: FormattedComputeRoutesArgs = {
      origin: { address: origin },
      destination: { address: destination },
      intermediates: intermediateWaypoints.map((waypoint) => ({
        address: waypoint,
      })),
      // travelMode: "",
    };

    console.log(formattedArgs);

    try {
      const { data, status, statusText } = await googleMapsAxiosInstance.post<
        GoogleComputeRoutesResponse,
        AxiosResponse<GoogleComputeRoutesResponse, FormattedComputeRoutesArgs>,
        FormattedComputeRoutesArgs
      >("/directions/v2:computeRoutes", formattedArgs, {
        headers: { "X-Goog-FieldMask": "*" },
      });

      res.json({ response: data, message: statusText, success: true });
    } catch (error) {
      console.error("Error:", error);
      res.json({ message: "Route retrieval failed", success: false });
    }
  },
);
