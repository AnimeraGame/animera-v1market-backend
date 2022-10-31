import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { BaseModel } from './base.model';

@ObjectType()
export class History extends BaseModel {
  constructor(partial: Partial<History>) {
    super();

    Object.assign(this, partial);
  }

  @Field()
  tokenId: number;

  @Field()
  from: string;

  @Field()
  to: string;

  @Field()
  price: string;

  @HideField()
  created_at: Date;

  @Field(() => Date, {
    description: 'Identifies the date and time when the object was created.'
  })
  @Expose()
  get createdAt(): Date {
    return this.created_at;
  }
}
