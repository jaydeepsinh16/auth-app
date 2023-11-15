import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './payload/create-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    try {
      const { email, password, firstName, lastName } = createUserDto;

      // Password hashing process
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);

      // Create User for signup
      await this.usersService.createUser({
        email: email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      response.status(HttpStatus.OK).send({
        data: {},
        message: 'User Registered Successfully',
      });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).send({
        data: {},
        message: 'User Registered Failed',
      });
    }
  }
}
