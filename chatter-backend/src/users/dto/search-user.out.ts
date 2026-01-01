import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/database/abstract.entity';

@ObjectType()
export class SearchUser extends AbstractEntity {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  isOnline: boolean;

  @Field()
  lastConnection: Date;

  @Field(() => String, { nullable: true })
  profileUrl?: string;
}
