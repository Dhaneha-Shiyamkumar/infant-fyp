import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserLoginDto } from '../auth/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schema/users.schema';
import { IUser, IUserCreate } from '@neha-project/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>
  ) {}

  async findAll() {
    return await this.userModel
      .find({})
      .select(['firstName', 'lastName', 'email', 'role', 'attributes']);
  }

  async create(userData: IUserCreate) {
    const { email } = userData;
    const user = await this.userModel.findOne({ email });

    if (user)
      throw new HttpException('Account already exist', HttpStatus.BAD_REQUEST);

    const createdUser = new this.userModel(userData);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async findOneById(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id);
    return this.sanitizeUser(user);
  }

  async findOneByIdChildrenPopulate(id: string): Promise<any> {
    const user = await this.userModel.findById(id).populate({
      path: 'attributes',
      populate: {
        path: 'children',
        model: 'children',
      },
    });
    return user.attributes.children;
  }

  async findByLogin(loginData: UserLoginDto) {
    const { email, password } = loginData;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid login', HttpStatus.BAD_REQUEST);
    }
  }

  sanitizeUser(user: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
  }) {
    return {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }
}
