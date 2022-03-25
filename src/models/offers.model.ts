import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { DirectOffer } from './directOffer.model';

@ObjectType()
export class DirectOffers {
  constructor(partial: Partial<DirectOffers>) {
    Object.assign(this, partial);
  }

  @Field(() => [DirectOffer], { nullable: true })
  offers: DirectOffer[];

  // count aliases
  @HideField()
  _count?: number;

  @Field(() => Number, { nullable: true })
  @Expose()
  get offersCount(): number {
    return this._count ? this._count : 0;
  }
}
