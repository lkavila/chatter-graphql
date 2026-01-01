import { forwardRef, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { ChatsModule } from '../chats/chats.module';
import { PubSubModule } from 'src/common/pubsub/pubsub.module';
import { MessageRepository } from './repositories/message.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { Message, MessageSchema } from './entities/message.entity';
import { MessagesController } from './messages.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [MessagesResolver, MessagesService, MessageRepository],
  imports: [
    forwardRef(() => ChatsModule),
    PubSubModule,
    DatabaseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    UsersModule,
  ],
  exports: [MessageRepository],
  controllers: [MessagesController],
})
export class MessagesModule {}
