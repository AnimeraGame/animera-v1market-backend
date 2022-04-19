import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { Sale } from './sale.model';

@ObjectType()
export class Sales {
  constructor(partial: Partial<Sales>) {
    Object.assign(this, partial);
  }

  @Field(() => [Sale], { nullable: true })
  sales: Sale[];

  // count aliases
  @HideField()
  _count?: number;

  @Field(() => Number, { nullable: true })
  @Expose()
  get offersCount(): number {
    return this._count ? this._count : 0;
  }
}
