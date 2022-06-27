import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  // Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, Prisma } from '@prisma/client';

import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createOwner(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createOwnerUser({
      username: createUserDto.username,
      passwordHash: await UserService.getPasswordHash(createUserDto.password),
      email: createUserDto.email,
      personalData: {
        create: {
          identifier: {
            create: { ...createUserDto.personalData.identifier },
          },
          active: createUserDto.personalData.active,
          name: {
            create: {
              ...createUserDto.personalData.name,
            },
          },
          telecom: {
            create: {
              ...createUserDto.personalData.telecom,
            },
          },
          gender: createUserDto.personalData.gender,
          birthDate: new Date(),
          photo: {
            create: {
              ...createUserDto.personalData.photo,
            },
          },
          communication: {
            create: [...createUserDto.personalData.communication],
          },
          relationship: createUserDto.personalData.relationship,
        },
      },
    });
  }

  @Get()
  async findAll(where: Prisma.UserWhereInput) {
    return this.userService.findAll({ where });
  }

  @Get(':id')
  async findOne(@Param('id') id?: number, @Param('email') email?: string) {
    return this.userService.findOne({
      id,
      email,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.userService.update({ id }, updateUserDto);
  }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
