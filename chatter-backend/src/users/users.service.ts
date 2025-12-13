import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcrypt';
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
  async create(createUserInput: CreateUserInput) {
    try {
      const user = await this.userRepository.create({
        ...createUserInput,
        password: await this.hashPassword(createUserInput.password),
        deleted: false,
        isOnline: false,
        isTyping: false,
        lastConnection: new Date(),
        username:
          createUserInput.username || createUserInput.email.split('@')[0],
      });
      return user;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 11000) {
        throw new UnprocessableEntityException('Email already exists.');
      }
      throw error;
    }
  }

  async findAll() {
    return this.userRepository.find({});
  }

  async findOne(_id: string) {
    return this.userRepository.findOne({ _id });
  }

  async update(_id: Types.ObjectId, updateUserInput: UpdateUserInput) {
    const updateObject = { ...updateUserInput };
    if (updateUserInput.password) {
      updateObject.password = await this.hashPassword(updateUserInput.password);
    }
    return this.userRepository.findOneAndUpdate(
      { _id },
      {
        $set: updateObject,
      },
    );
  }

  async remove(_id: Types.ObjectId) {
    return this.userRepository.findOneAndDelete({ _id });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async searchUsers(currentUserId: Types.ObjectId, search?: string) {
    const searchRegexQuery = search
      ? [
          { username: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ]
      : [];
    return this.userRepository.model
      .find({
        _id: { $ne: currentUserId },
        $or: searchRegexQuery,
        deleted: false,
      })
      .select('username email isOnline lastConnection')
      .limit(20);
  }
}
