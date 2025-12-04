import { Types } from 'mongoose';

export interface TokenPayload {
  _id: Types.ObjectId;
  email: string;
  username: string;
}
