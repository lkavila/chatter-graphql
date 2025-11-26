import { Injectable } from '@nestjs/common';
import { ChatRepository } from '../repositories/chat.repository';
import { CreateMessageInput, GetMessagesArgs } from './dto/message.dto';
import { Types } from 'mongoose';

@Injectable()
export class MessagesService {
  constructor(private readonly chatRepository: ChatRepository) {}

  private userInChatFilter(userId: Types.ObjectId) {
    return {
      $or: [{ userId }, { userIds: { $in: [userId] } }],
    };
  }
  async createMessage(
    messageInput: CreateMessageInput,
    userId: Types.ObjectId,
  ) {
    const messageData = {
      content: messageInput.content,
      createdAt: new Date(),
      userId,
      _id: new Types.ObjectId(),
    };
    await this.chatRepository.findOneAndUpdate(
      {
        _id: messageInput.chatId,
        ...this.userInChatFilter(userId),
      },
      { $push: { messages: messageData } },
    );
    return messageData;
  }

  async findByChat(getMessagesArgs: GetMessagesArgs, userId: Types.ObjectId) {
    return (
      await this.chatRepository.findOne(
        { _id: getMessagesArgs.chatId, ...this.userInChatFilter(userId) },
        { messages: 1 },
      )
    )?.messages;
  }
}
