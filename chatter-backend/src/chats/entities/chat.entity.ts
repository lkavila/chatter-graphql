import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Message } from '../messages/entities/message.entity';

@ObjectType()
@Schema()
export class Chat extends AbstractEntity {
  @Field(() => ID)
  @Prop()
  userId: Types.ObjectId;

  @Field()
  @Prop()
  isPrivate: boolean;

  @Field(() => [String])
  @Prop([String])
  userIds: string[];

  @Field({ nullable: true })
  @Prop()
  name?: string;

  @Prop([Message])
  messages: Message[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
