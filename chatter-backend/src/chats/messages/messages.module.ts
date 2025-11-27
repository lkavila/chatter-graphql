import { forwardRef, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { ChatsModule } from '../chats.module';
import { PubSubModule } from 'src/common/pubsub/pubsub.module';

@Module({
  providers: [MessagesResolver, MessagesService],
  imports: [forwardRef(() => ChatsModule), PubSubModule],
})
export class MessagesModule {}
