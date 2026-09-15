import { type Request, Router, json as ExpressJson, Response } from "express";
import axios from "axios";

export const googleRouter = Router();
googleRouter.use(ExpressJson());

const BASE_URL = "https://routes.googleapis.com";
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

googleRouter.post("/compute-routes", (req: Request, res: Response) => {
  const body = req.body;
});
