import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chat } from '../entities/chat.entity';

@Injectable()
export class ChatRepository extends AbstractRepository<Chat> {
  protected readonly logger = new Logger(ChatRepository.name);

  constructor(@InjectModel(Chat.name) chatModel: Model<Chat>) {
    super(chatModel);
  }

  async validateUserIsInChat(userId: Types.ObjectId, chatId: string) {
    return this.findOne(
      {
        _id: chatId,
        $or: [
          { createdBy: userId },
          { userIds: { $in: [userId] } },
          { isPrivate: false },
        ],
      },
      { _id: 1 },
    );
  }
}
