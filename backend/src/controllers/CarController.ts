import { Request, Response, Router } from "express";
import { CarService } from "../services/CarService";

export const carRoute = Router()
const service = new CarService()

carRoute.post('/cars',
  async (req: Request, res: Response) => {
    const { model, plate, renavam, price, userId } = req.body
    const result = await service.createCar({ model, plate, renavam, price, userId })
    return res.status(201).json(result)
  }
)

carRoute.get('/cars',
  async (req: Request, res: Response) => {
    const result = await service.listCars()
    return res.json(result)
  }
)

carRoute.get('/cars/:carId',
  async (req: Request, res: Response) => {
    const { carId } = req.params
    const result = await service.findById(+carId)
    return res.json(result)
  }
)

carRoute.delete('/cars/:carId',
  async (req: Request, res: Response) => {
    const { carId } = req.params
    const result = await service.deleteCar(+carId)
    return res.json(result)
  }
)