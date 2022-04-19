import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { Offer } from './offer.model';

@ObjectType()
export class Offers {
  constructor(partial: Partial<Offers>) {
    Object.assign(this, partial);
  }

  @Field(() => [Offer], { nullable: true })
  offers: Offer[];

  // count aliases
  @HideField()
  _count?: number;

  @Field(() => Number, { nullable: true })
  @Expose()
  get offersCount(): number {
    return this._count ? this._count : 0;
  }
}
