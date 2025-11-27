import { Inject, Injectable } from '@nestjs/common';
import { ChatRepository } from '../repositories/chat.repository';
import { CreateMessageInput, GetMessagesArgs } from './dto/message.dto';
import { Types } from 'mongoose';
import { PUB_SUB } from 'src/common/constants/injection-tokens';
import { PubSub } from 'graphql-subscriptions';
import { MESSAGE_CREATED } from './constants/pubsub-triggers';
import { ChatsService } from '../chats.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly chatService: ChatsService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

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
        ...this.chatService.userInChatFilter(userId),
      },
      { $push: { messages: messageData } },
    );
    await this.pubSub.publish(MESSAGE_CREATED, {
      messageCreated: { ...messageData, chatId: messageInput.chatId },
    });
    return messageData;
  }

  async findByChat(getMessagesArgs: GetMessagesArgs, userId: Types.ObjectId) {
    return (
      await this.chatRepository.findOne(
        {
          _id: getMessagesArgs.chatId,
          ...this.chatService.userInChatFilter(userId),
        },
        { messages: 1 },
      )
    )?.messages;
  }

  async messageCreated({
    chatId,
    userId,
  }: {
    chatId: string;
    userId: Types.ObjectId;
  }) {
    await this.chatRepository.findOne(
      {
        _id: chatId,
        ...this.chatService.userInChatFilter(userId),
      },
      { _id: 1 },
    );
    return this.pubSub.asyncIterableIterator(MESSAGE_CREATED);
  }
}
