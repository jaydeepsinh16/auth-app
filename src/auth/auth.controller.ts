import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Logger,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './payload/login.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body(ValidationPipe) loginReqData: LoginDto,
    @Res() response: Response,
  ) {
    try {
      this.logger.log(loginReqData);
      const { email, password } = loginReqData;

      // Authorise the user Details
      const signInData = await this.authService.signIn(email, password);
      this.logger.log(`signInData`, signInData);

      if (signInData) {
        response.status(HttpStatus.OK).send(signInData);
      } else {
        this.logger.error('Login Failed');
        response.status(HttpStatus.UNAUTHORIZED).send({
          data: {},
          message: 'Login Failed',
        });
      }
    } catch (error) {
      this.logger.error(error);
      response.status(HttpStatus.UNAUTHORIZED).send({
        data: {},
        message: 'Login Failed',
      });
    }
  }
}
