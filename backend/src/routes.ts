import { Router } from "express";
import { profileRoute } from "./controllers/ProfileController";
import { userRoute } from "./controllers/UserController";
import { carRoute } from "./controllers/CarController";
import { authRoute } from "./controllers/AuthenticationController";

export const routes = Router()

routes.use(profileRoute)
routes.use(userRoute)
routes.use(carRoute)
routes.use(authRoute)