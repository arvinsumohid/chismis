import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: Model<UserDocument>,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should not create when fields are missing', async () => {
    const user: CreateUserDto = {
      username: null,
      name: 'test',
      email: 'test@test.com',
      password: '123456',
      repassword: '123456',
    };

    expect(controller.create(user)).rejects.toThrowError('fields are required');
  });

  it('should not create when password and repassword not the same', async () => {
    const user: CreateUserDto = {
      username: 'test',
      name: 'test',
      email: 'test@test.com',
      password: '123456',
      repassword: '12345',
    };

    expect(controller.create(user)).rejects.toThrowError(
      'password and repassword not match',
    );
  });

  // it('should not create when email already exist', async () => {
  //   const user: CreateUserDto = {
  //     username: 'test',
  //     name: 'test',
  //     email: 'test@test.com',
  //     password: '123456',
  //     repassword: '123456',
  //   };

  //   //save the user again
  //   expect(controller.create(user)).rejects.toThrowError('email already exist');
  // });

  it('should create user successfully', async () => {
    const user: CreateUserDto = {
      username: 'test',
      name: 'test',
      email: 'test@test.com',
      password: '123456',
      repassword: '123456',
    };

    //save the user again
    expect(await controller.findAll()).toBe([user]);
    // expect(controller.create(user)).rejects.toThrowError('email already exist');
  });
});
