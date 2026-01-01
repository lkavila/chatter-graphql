import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';

@Schema({ versionKey: false, timestamps: true })
@ObjectType()
export class User extends AbstractEntity {
  @Prop()
  @Field()
  email: string;

  @Prop()
  password: string;

  @Field()
  @Prop()
  username: string;

  @Field()
  @Prop({ default: false })
  deleted: boolean;

  @Field()
  @Prop()
  isOnline: boolean;

  @Field()
  @Prop()
  lastConnection: Date;

  @Field(() => String, { nullable: true })
  @Prop()
  profileUrl?: string;

  @Field()
  @Prop()
  createdAt: Date;

  @Field()
  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
