import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { LastMessage } from 'src/messages/dto/last-message.out';

@ObjectType()
export class ChatDocumentWithLastMessage extends AbstractEntity {
  @Field(() => ID)
  createdBy: Types.ObjectId | string;

  @Field()
  isPrivate: boolean;

  @Field()
  isGroup: boolean;

  @Field(() => [ID])
  userIds: Types.ObjectId[];

  @Field({ nullable: true })
  name?: string;

  @Field(() => LastMessage, { nullable: true })
  @IsOptional()
  lastMessage?: LastMessage | null;

  @Field()
  deleted: boolean;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class ChatDocument extends AbstractEntity {
  @Field(() => ID)
  createdBy: Types.ObjectId | string;

  @Field()
  isPrivate: boolean;

  @Field()
  isGroup: boolean;

  @Field(() => [String])
  userIds: string[];

  @Field({ nullable: true })
  name?: string;

  @Field()
  deleted: boolean;

  @Field()
  createdAt: Date;
}
