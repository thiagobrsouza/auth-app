import { Request, Response, Router } from "express";
import { UserService } from "../services/UserService";

export const userRoute = Router()
const service = new UserService()

userRoute.post('/users',
  async (req: Request, res: Response) => {
    const { name, username, password, confirmPassword, profileId } = req.body
    const result = await service.createUser({ name, username, password, confirmPassword, profileId })
    return res.status(201).json(result)
  }
)

userRoute.get('/users',
  async (req: Request, res: Response) => {
    const result = await service.listUsers()
    return res.json(result)
  }
)

userRoute.get('/users/:userId',
  async (req: Request, res: Response) => {
    const { userId } = req.params
    const result = await service.findById(+userId)
    return res.json(result)
  }
)

userRoute.patch('/users/:userId',
  async (req: Request, res: Response) => {
    const { userId } = req.params
    const { name, username, password, confirmPassword, profileId } = req.body
    const result = await service.updateUser(+userId, { name, username, password, confirmPassword, profileId })
    return res.json(result)
  }
)