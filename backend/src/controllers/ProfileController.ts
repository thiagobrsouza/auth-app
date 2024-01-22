import { Request, Response, Router } from "express";
import { ProfileService } from "../services/ProfileService";

export const profileRoute = Router()
const service = new ProfileService()

profileRoute.post('/profiles',
  async (req: Request, res: Response) => {
    const { description, permissions } = req.body;
    const result = await service.createProfile({ description, permissions })
    return res.status(201).json(result)
  }
)

profileRoute.get('/profiles',
  async (req: Request, res: Response) => {
    const result = await service.listProfiles()
    return res.json(result)
  }
)

profileRoute.patch('/profiles/:profileId',
  async (req: Request, res: Response) => {
    const { profileId } = req.params
    const { description, addPermission, removePermission } = req.body
    const result = await service.updateProfile(+profileId, { description, addPermission, removePermission })
    return res.json(result)
  }
)