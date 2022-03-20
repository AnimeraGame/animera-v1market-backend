import { Field, Int, ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { DirectOffer } from '../directOffer.model';

@ObjectType()
export class DirectOfferConnection extends PaginatedResponse(DirectOffer) {
  @Field(() => BigInt, { nullable: true })
  endCursor: BigInt;

  @Field(() => BigInt, { nullable: true })
  startCursor: BigInt;
}
