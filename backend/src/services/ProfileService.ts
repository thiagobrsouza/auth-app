import { prisma } from "../prismaClient";

interface CreateProfile {
  description: string;
  permissions: number[];
}

export class ProfileService {

  async createProfile({ description, permissions }: CreateProfile) {

    const profile = await prisma.profile.create({
      data: {
        description,
        profilePermissions: {
          create: permissions.map((permissionId: number) => ({
            permissions: {
              connect: { id: permissionId }
            }
          }))
        }
      },
      select: {
        id: true, description: true, profilePermissions: { select: { permissions: true } }
      }
    })

    return profile;

  }

}