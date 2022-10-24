import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEstateInput {
  @Field({ nullable: true })
  price?: string;

  @Field({ nullable: true })
  nft_id?: number;

  @Field({ nullable: true })
  type?: number;

  @Field({ nullable: true })
  token_address?: string;

  @Field({ nullable: true })
  expire_at?: Date;

  @Field({ nullable: true })
  seller: string;

  @Field({ nullable: true })
  buyer: string;

  @Field({ nullable: true })
  status?: number;
}
