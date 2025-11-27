import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateMessageInput {
  @Field()
  @IsNotEmpty()
  content: string;

  @Field()
  @IsNotEmpty()
  chatId: string;
}

@ArgsType()
export class GetMessagesArgs {
  @Field({ nullable: true })
  @IsOptional()
  chatId?: string;
}

@ArgsType()
export class CreateMessagesArgs {
  @Field()
  @IsNotEmpty()
  @IsString()
  chatId: string;
}
