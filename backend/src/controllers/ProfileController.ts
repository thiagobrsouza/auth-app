import { Request, Response, Router } from "express";
import { ProfileService } from "../services/ProfileService";

export const profileRoute = Router()
const service = new ProfileService()

profileRoute.post('/profiles',
  async (req: Request, res: Response) => {
    const { description, permissions} = req.body;
    const result = await service.createProfile({description, permissions})
    return res.status(201).json(result)
  }
)