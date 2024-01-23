import { Router } from "express";
import { profileRoute } from "./controllers/ProfileController";
import { userRoute } from "./controllers/UserController";

export const routes = Router()

routes.use(profileRoute)
routes.use(userRoute)