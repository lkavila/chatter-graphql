import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import type { TokenPayload } from 'src/auth/token-payload.interface';
import { ChatDocument, ChatDocumentWithLastMessage } from './dto/chat.document';

@Resolver(() => ChatDocument)
export class ChatsResolver {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ChatDocumentWithLastMessage)
  createChat(
    @Args('createChatInput') createChatInput: CreateChatInput,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.chatsService.create(createChatInput, user._id);
  }

  @Query(() => [ChatDocumentWithLastMessage], { name: 'chats' })
  @UseGuards(GqlAuthGuard)
  findAll(@CurrentUser() user: TokenPayload) {
    return this.chatsService.findAllWithLastMessage(user._id);
  }

  @Query(() => ChatDocumentWithLastMessage, { name: 'chat', nullable: true })
  @UseGuards(GqlAuthGuard)
  findOne(
    @Args('_id', { type: () => String, nullable: true }) _id?: string,
  ): Promise<ChatDocumentWithLastMessage> | null {
    return this.chatsService.findOne(_id);
  }

  @Mutation(() => ChatDocument)
  @UseGuards(GqlAuthGuard)
  updateChat(
    @Args('updateChatInput') updateChatInput: UpdateChatInput,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.chatsService.update(user._id, updateChatInput);
  }

  @Mutation(() => ChatDocument)
  @UseGuards(GqlAuthGuard)
  removeChat(@Args('id', { type: () => Int }) id: number) {
    return this.chatsService.remove(id);
  }
}
