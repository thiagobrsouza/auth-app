import { Router } from "express";
import { profileRoute } from "./controllers/ProfileController";

export const routes = Router()

routes.use(profileRoute)