import { compare } from "bcryptjs";
import { prisma } from "../prismaClient";
import { sign } from "jsonwebtoken";

interface SignRequest {
  username: string;
  password: string;
}

export class AuthenticationService {

  async login({username, password}: SignRequest) {

    const user = await prisma.user.findFirst({
      where: { user: username }
    })

    if (!user) {
      throw new Error('User not found!')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('User/password incorrect!')
    }

    const token = sign(
      { username: user.user },
      process.env.JWT_SECRET,
      { subject: user.id.toString(), expiresIn: '30d' }
    )

    return {
      id: user.id,
      username: user.user,
      token: token
    }

  }

}