import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty } from 'class-validator';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';

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
export class GetMessagesArgs extends PaginationArgs {
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
