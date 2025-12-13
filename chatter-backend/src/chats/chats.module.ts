import { forwardRef, Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';
import { ChatRepository } from './repositories/chat.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { Chat, ChatSchema } from './entities/chat.entity';
import { MessagesModule } from 'src/messages/messages.module';
import { PubSubModule } from 'src/common/pubsub/pubsub.module';
import { ChatsController } from './chats.controller';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    forwardRef(() => MessagesModule),
    PubSubModule,
  ],
  providers: [ChatsResolver, ChatsService, ChatRepository],
  exports: [ChatRepository, ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule {}
