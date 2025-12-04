import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { ChatRepository } from './repositories/chat.repository';
import { Types } from 'mongoose';
import { MessageRepository } from 'src/messages/repositories/message.repository';

@Injectable()
export class ChatsService {
  constructor(
    private readonly chatRepository: ChatRepository,
    @Inject(forwardRef(() => MessageRepository))
    private readonly messageRepository: MessageRepository,
  ) {}
  userInChatFilter(userId: Types.ObjectId) {
    return {
      $or: [{ userId }, { userIds: { $in: [userId] } }, { isPrivate: false }],
    };
  }

  async create(createChatInput: CreateChatInput, userId: Types.ObjectId) {
    const chat = await this.chatRepository.create({
      ...createChatInput,
      userId,
      userIds: createChatInput.userIds || [],
      deleted: false,
      createdAt: new Date(),
    });

    return {
      ...chat,
      lastMessage: null,
    };
  }

  async findAll(userId: Types.ObjectId) {
    return this.chatRepository.find({ ...this.userInChatFilter(userId) });
  }

  async findAllWithLastMessage(
    userId: Types.ObjectId,
    options?: Record<string, number | string>,
  ) {
    const currentOptions = {
      limit: (options?.limit && (options.limit as number)) || 30,
      skip: (options?.skip && (options.skip as number)) || 0,
    };
    const data = await this.chatRepository.model.aggregate([
      {
        $match: { ...this.userInChatFilter(userId) },
      },
      {
        $lookup: {
          from: 'messages',
          let: { chatId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$chat', '$$chatId'] } } },
            { $sort: { createdAt: -1 } },
            { $limit: 1 },
          ],
          as: 'lastMessage',
        },
      },
      {
        $unwind: {
          path: '$lastMessage',
          preserveNullAndEmptyArrays: true, // si no hay mensajes, se deja como null
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { userId: '$lastMessage.user' },
          pipeline: [
            {
              $match: { $expr: { $eq: ['$_id', '$$userId'] } },
            },
            { $project: { username: 1, _id: 1 } },
          ],
          as: 'lastMessage.user',
        },
      },
      {
        $addFields: {
          'lastMessage.user': {
            $cond: {
              if: { $eq: [{ $size: '$lastMessage.user' }, 0] }, // ¿El array está vacío?
              then: null, // Retorna null explícito
              else: { $arrayElemAt: ['$lastMessage.user', 0] }, // Si no, toma el primer elemento (índice 0)
            },
          },
        },
      },
      {
        $addFields: {
          lastMessage: {
            $cond: {
              if: { $eq: ['$lastMessage.user', null] }, // ¿El array está vacío?
              then: null, // Retorna null explícito
              else: '$lastMessage',
            },
          },
        },
      },
      {
        $sort: {
          'lastMessage.createdAt': -1,
        },
      },
      { $skip: currentOptions.skip },
      { $limit: currentOptions.limit },
    ]);
    console.log(data);
    return data;
  }

  async findLastMessageByChat(chatId: Types.ObjectId) {
    const messages = await this.messageRepository.model
      .find({ chat: chatId })
      .sort({ createdAt: -1 })
      .limit(1);

    return messages[0];
  }

  findOne(_id?: string) {
    if (!_id) return null;
    return this.chatRepository.findOne({ _id });
  }

  async update(userId: Types.ObjectId, updateChatInput: UpdateChatInput) {
    await this.chatRepository.validateUserIsInChat(
      userId,
      updateChatInput.chatId,
    );
    return this.chatRepository.findOneAndUpdate(
      { _id: updateChatInput.chatId },
      updateChatInput,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
