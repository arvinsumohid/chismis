import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate } from 'class-validator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const errors = await validate(createUserDto);
    if (errors.length > 0)
      throw new BadRequestException('there are fields that required');

    if (
      !createUserDto.email ||
      !createUserDto.name ||
      !createUserDto.password ||
      !createUserDto.repassword ||
      !createUserDto.username
    )
      throw new BadRequestException('fields are required');

    if (createUserDto.password !== createUserDto.repassword)
      throw new BadRequestException('password and repassword not match');

    // const emailCheck = await this.userService.findByEmail(createUserDto.email);
    // if (emailCheck) throw new BadRequestException('email already exist');

    // if (this.userService.findByUsername(createUserDto.username))
    //   throw new BadRequestException('username already exist');

    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
