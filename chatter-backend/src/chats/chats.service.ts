import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { ChatRepository } from './repositories/chat.repository';
import { Types } from 'mongoose';

@Injectable()
export class ChatsService {
  constructor(private readonly chatRepository: ChatRepository) {}
  userInChatFilter(userId: Types.ObjectId) {
    return {
      $or: [{ userId }, { userIds: { $in: [userId] } }, { isPrivate: false }],
    };
  }

  create(createChatInput: CreateChatInput, userId: Types.ObjectId) {
    return this.chatRepository.create({
      ...createChatInput,
      userId,
      userIds: createChatInput.userIds || [],
      messages: [],
    });
  }

  async findAll(userId: Types.ObjectId) {
    return this.chatRepository.find({ ...this.userInChatFilter(userId) });
  }

  findOne(_id?: string) {
    if (!_id) return null;
    return this.chatRepository.findOne({ _id });
  }

  update(id: number, updateChatInput: UpdateChatInput) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
