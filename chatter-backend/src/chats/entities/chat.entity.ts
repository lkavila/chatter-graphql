import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';

@Schema()
export class Chat extends AbstractEntity {
  @Prop()
  isPrivate: boolean;

  @Prop()
  isGroup: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  userIds: Types.ObjectId[];

  @Prop()
  name?: string;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop()
  createdAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
