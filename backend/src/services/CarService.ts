import { prisma } from "../prismaClient";

interface Car {
  model: string;
  plate: string;
  renavam: string;
  price: string;
  userId: number;
}

export class CarService {

  private async checkCarExists(plate: string, renavam: string) {
    const exists = await prisma.car.findFirst({
      where: { plate, renavam }
    })
    if (exists) {
      throw new Error('Car already exists')
    }
  }

  async createCar({model, plate, renavam, price, userId}: Car) {
    await this.checkCarExists(plate, renavam)
    const newCar = await prisma.car.create({
      data: {
        model, plate, renavam, price, user: { connect: { id: userId } }
      },
      select: {
        id: true, model: true, plate: true, renavam: true, user: { select: { name: true } }
      }
    })
    return newCar
  }

  async listCars() {
    return await prisma.car.findMany()
  }

  async findById(carId: number) {
    const car = await prisma.car.findFirst({
      where: { id: carId }
    })
    return car
  }

  async deleteCar(carId: number) {
    try {
      await prisma.car.delete({
        where: { id: carId }
      })
    } catch {
      throw new Error('Car do not deleted!')
    }
  }

}