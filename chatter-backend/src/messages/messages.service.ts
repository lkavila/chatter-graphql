import { Inject, Injectable } from '@nestjs/common';
import { ChatRepository } from '../chats/repositories/chat.repository';
import { CreateMessageInput, GetMessagesArgs } from './dto/message.dto';
import { Types } from 'mongoose';
import { PUB_SUB } from 'src/common/constants/injection-tokens';
import { PubSub } from 'graphql-subscriptions';
import { MESSAGE_CREATED } from './constants/pubsub-triggers';
import { MessageRepository } from './repositories/message.repository';
import { TokenPayload } from 'src/auth/token-payload.interface';
import { LastMessage } from './dto/last-message.out';

@Injectable()
export class MessagesService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly messagesRepository: MessageRepository,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  async createMessage(messageInput: CreateMessageInput, user: TokenPayload) {
    const messageData = {
      content: messageInput.content,
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false,
      user: new Types.ObjectId(user._id),
    };
    const message = await this.messagesRepository.create({
      ...messageData,
      chat: new Types.ObjectId(messageInput.chatId),
    });
    const lastMessageData = {
      ...message,
      user: {
        _id: user._id,
        username: user.username,
      },
    };
    await this.pubSub.publish(MESSAGE_CREATED, {
      messageCreated: { ...lastMessageData },
    });

    return lastMessageData;
  }

  async findByChat(getMessagesArgs: GetMessagesArgs, userId: Types.ObjectId) {
    const userHasAccess = await this.chatRepository.validateUserIsInChat(
      userId,
      getMessagesArgs.chatId,
    );
    if (!userHasAccess?._id) return null;
    const result = await this.messagesRepository.model.aggregate([
      { $match: { chat: new Types.ObjectId(getMessagesArgs.chatId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
          pipeline: [
            {
              $project: {
                username: 1,
                _id: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ['$user', 0] },
        },
      },
    ]);

    return result as LastMessage[];
  }

  messageCreated() {
    return this.pubSub.asyncIterableIterator(MESSAGE_CREATED);
  }
}
