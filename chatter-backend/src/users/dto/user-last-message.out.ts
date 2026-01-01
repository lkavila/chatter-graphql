import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/database/abstract.entity';

@ObjectType()
export class UserLastMessage extends AbstractEntity {
  @Field()
  username: string;

  @Field(() => String, { nullable: true })
  profileUrl?: string;
}
