import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateOfferInput {
  @Field()
  id: string;

  @Field()
  chainId: number;

  @Field()
  sellerPrice: number;

  @Field()
  nftId: string;

  @Field()
  tokenId: number;

  @Field()
  tokenAddress: string;

  @Field()
  sellerDeadline: Date;

  @Field()
  signature: string;

  @Field()
  sellerWalletAddress: string;

  @Field({ nullable: true })
  status?: number
}
