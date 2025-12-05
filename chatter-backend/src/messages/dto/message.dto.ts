import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty } from 'class-validator';

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
  @Field()
  chatId: string;
}

@ArgsType()
export class CreateMessagesArgs {
  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ each: true })
  chatIds: string[];
}
