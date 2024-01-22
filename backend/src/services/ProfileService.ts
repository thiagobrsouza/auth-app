import { prisma } from "../prismaClient";

interface CreateProfile {
  description: string;
  permissions: number[];
}

interface UpdateProfile {
  description?: string;
  addPermission?: number[];
  removePermission?: number[];
}

export class ProfileService {

  async createProfile({ description, permissions }: CreateProfile) {

    const exists = await prisma.profile.findFirst({
      where: { description }
    });

    if (exists) {
      throw new Error('Profile already exists')
    }

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

  async listProfiles() {
    return await prisma.profile.findMany({
      select: {
        id: true, description: true, profilePermissions: { select: { permissions: true } }
      }
    })
  }

  async updateProfile(profileId: number, { description, addPermission, removePermission }: UpdateProfile) {

    const profileFounded = await prisma.profile.findFirst({
      where: { id: profileId }
    });

    const exists = await prisma.profile.findFirst({
      where: { description }
    });

    if (exists && exists.id !== profileFounded?.id) {
      throw new Error('Profile already exists');
    }

    return await prisma.profile.update({
      where: { id: profileId },
      data: {
        description,
        profilePermissions: {
          create: addPermission?.map((permissionId: number) => ({
            permissions: {
              connect: { id: permissionId }
            }
          })),
          deleteMany: removePermission?.map((permissionId: number) => ({
            permissionId: permissionId,
            profileId: profileId
          }))
        }
      },
      select: {
        id: true, description: true, profilePermissions: { select: { permissions: true } }
      }
    });

  }

}