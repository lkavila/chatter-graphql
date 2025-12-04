import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';

@Schema()
export class Chat extends AbstractEntity {
  @Prop()
  userId: Types.ObjectId;

  @Prop()
  isPrivate: boolean;

  @Prop([String])
  userIds: string[];

  @Prop()
  name?: string;

  @Prop({ default: false })
  deleted: boolean;

  @Prop()
  createdAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
