import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   *
   * @param email : Req Email
   * @param password : Req Password
   * @returns user ? user is valid : null
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUser({ email });
    this.logger.log(`User :${user}`);
    if (!user) {
      return null;
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  /**
   *
   * @param user : User Details
   * @returns Generated JWT token
   */
  async generateToken(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   *
   * @param userEmail : Req Email
   * @param password : Req Password
   * @returns Validate User & Generate token
   */
  async signIn(userEmail: string, password: string): Promise<any> {
    const validUser = await this.validateUser(userEmail, password);
    this.logger.debug(validUser);
    if (!Boolean(validUser)) {
      return null;
    }

    return await this.generateToken(validUser);
  }
}
