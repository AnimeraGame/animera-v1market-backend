import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddHistoryInput {
  @Field()
  id: number;

  @Field()
  tokenId: number;

  @Field()
  from: string;

  @Field()
  to: string;

  @Field()
  price: string;
}
