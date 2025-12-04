import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import {
  CreateMessageInput,
  CreateMessagesArgs,
  GetMessagesArgs,
} from './dto/message.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import type { TokenPayload } from 'src/auth/token-payload.interface';
import { PUB_SUB } from 'src/common/constants/injection-tokens';
import { PubSub } from 'graphql-subscriptions';
import { LastMessage } from './dto/last-message.out';

@Resolver(() => LastMessage)
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @Mutation(() => LastMessage)
  @UseGuards(GqlAuthGuard)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.messagesService.createMessage(createMessageInput, user);
  }

  @Query(() => [LastMessage], { name: 'messages', nullable: true })
  @UseGuards(GqlAuthGuard)
  getMessages(
    @Args() getMessagesArgs: GetMessagesArgs,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.messagesService.findByChat(getMessagesArgs, user._id);
  }

  @Subscription(() => LastMessage, {
    filter: (
      payload: { messageCreated: LastMessage },
      variables: { chatId: string },
      context,
    ) => {
      const userId = context.req.user._id;
      return (
        payload.messageCreated.chat.toString() === variables.chatId &&
        userId !== payload.messageCreated.user._id
      );
    },
  })
  messageCreated(
    @Args() createMessageArgs: CreateMessagesArgs,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.messagesService.messageCreated({
      chatId: createMessageArgs.chatId,
      userId: user._id,
    });
  }
}
