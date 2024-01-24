import { Request, Response, Router } from "express";
import { AuthenticationService } from "../services/AuthenticationService";

export const authRoute = Router()
const service = new AuthenticationService()

authRoute.post('/sign',
  async (req: Request, res: Response) => {
    const { username, password } = req.body
    const result = await service.login({ username, password })
    return res.json(result)
  }
)