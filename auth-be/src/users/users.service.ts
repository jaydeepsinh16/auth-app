import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';

interface UserArg {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   *
   * @param userDetails
   * @returns Created User record
   */
  async createUser(userDetails: UserArg): Promise<User> {
    const { email, password, firstName, lastName } = userDetails;
    return this.userModel.create({
      email,
      password,
      firstName,
      lastName,
    });
  }

  /**
   *
   * @param query : User filter query param
   * @returns : User details
   */
  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }
}
