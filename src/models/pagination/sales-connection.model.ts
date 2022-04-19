import { Field, Int, ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { Sale } from '../sale.model';

@ObjectType()
export class DirectOfferConnection extends PaginatedResponse(Sale) {
  @Field(() => BigInt, { nullable: true })
  endCursor: BigInt;

  @Field(() => BigInt, { nullable: true })
  startCursor: BigInt;
}
