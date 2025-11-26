import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateMessageInput, GetMessagesArgs } from './dto/message.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import type { TokenPayload } from 'src/auth/token-payload.interface';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => Message)
  @UseGuards(GqlAuthGuard)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.messagesService.createMessage(createMessageInput, user._id);
  }

  @Query(() => [Message], { name: 'messages', nullable: true })
  @UseGuards(GqlAuthGuard)
  getMessages(
    @Args() getMessagesArgs: GetMessagesArgs,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.messagesService.findByChat(getMessagesArgs, user._id);
  }
}
