import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { UserLastMessage } from 'src/users/dto/user-last-message.out';

@ObjectType()
export class LastMessage extends AbstractEntity {
  @Field()
  content: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => UserLastMessage)
  user: UserLastMessage;

  @Field(() => ID)
  chat: Types.ObjectId;

  @Field()
  deleted: boolean;
}
