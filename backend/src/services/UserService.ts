import { hash } from "bcryptjs";
import { prisma } from "../prismaClient";

interface CreateUser {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  profileId: number;
}

interface UpdateUser {
  name?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  profileId?: number;
}

export class UserService {

  private async checkUserNameExists(username: string) {
    const exists = await prisma.user.findFirst({
      where: { user: username }
    })
    if (exists) {
      throw new Error('Username already exists')
    }
  }

  async createUser({name, username, password, confirmPassword, profileId}: CreateUser) {

    await this.checkUserNameExists(username)

    if (password !== confirmPassword) {
      throw new Error('Passwords do not matches')
    }

    const hashPassword = await hash(password, 8)

    const newUser = await prisma.user.create({
      data: {
        name, user: username, password: hashPassword,
        profile: { connect: { id: profileId } }
      },
      select: {
        id: true, name: true, user: true, profile: { select: { description: true } }
      }
    })

    return newUser

  }

  async listUsers() {
    return await prisma.user.findMany({
      select: {
        id: true, name: true, user: true, profile: { select: { description: true } }
      }
    })
  }

  async findById(userId: number) {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        id: true, name: true, user: true, profile: { select: { description: true } }
      }
    })
    return user
  }

  async updateUser(userId: number, {name, username, password, confirmPassword, profileId}: UpdateUser) {

    const userFounded = await prisma.user.findFirst({
      where: { id: userId }
    })

    if (!userFounded) {
      throw new Error('User not found');
    }

    if (username && username !== userFounded.user) {
      await this.checkUserNameExists(username)
    }

    if (password && confirmPassword && password !== confirmPassword) {
      throw new Error('Passwords do not matches')
    }

    const updateData: any = { name, user: username, profile: { connect: { id: profileId } } };

    if (password) {
      updateData.password = await hash(password, 8);
    }

    return await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true, name: true, user: true, profile: { select: { description: true } }
      }
    })

  }

}