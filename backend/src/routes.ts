import { Router } from "express";
import { profileRoute } from "./controllers/ProfileController";
import { userRoute } from "./controllers/UserController";
import { carRoute } from "./controllers/CarController";

export const routes = Router()

routes.use(profileRoute)
routes.use(userRoute)
routes.use(carRoute)