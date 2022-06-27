import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

// import { User } from './entities/user.entity';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.UserCreateWithoutRolesInput, role: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        roles: {
          connect: [
            {
              name: role,
            },
          ],
        },
      },
    });
  }
  async createOwnerUser(
    data: Prisma.UserCreateWithoutRolesInput,
  ): Promise<User> {
    return this.create(data, "owner");
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    return this.prisma.user.findMany(params);
  }

  findOne(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where });
  }

  update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where,
      data,
    });
  }

  remove(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({ where });
  }

  public static async getPasswordHash(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }
}
