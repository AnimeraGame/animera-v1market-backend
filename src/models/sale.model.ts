import {
  Field,
  Float,
  HideField,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { BaseModel } from './base.model';
import { Nft } from './nft.model';

export enum SaleStatus {
  active = 0,
  finished = 1
}

registerEnumType(SaleStatus, {
  name: 'SaleStatus',
  description: 'Possible offers statuses'
});

@ObjectType()
export class Sale extends BaseModel {
  constructor(partial: Partial<Sale>) {
    super();

    Object.assign(this, partial);
  }

  @HideField()
  nft_id?: string;

  @Field()
  seller: string;

  @HideField()
  seller_signature: string;

  @Field(() => String, { nullable: true })
  @Expose()
  get sellerSignature(): string {
    return this.seller_signature;
  }

  @HideField()
  buyer: string;

  @Field({ nullable: true })
  tx: string;

  @HideField()
  token_address: string;

  @Field(() => String, { nullable: true })
  @Expose()
  get tokenAddress(): string {
    return this.token_address;
  }

  @Field(() => SaleStatus)
  status: SaleStatus;

  @Field(() => Float)
  price: number;

  @Field(() => Nft, { nullable: true })
  nft?: Nft | null;

  // closed_at alias
  @HideField()
  closed_at: Date;

  @Field(() => Date, {
    description: 'Identifies the date and time when the offer closed.',
    nullable: true
  })
  @Expose()
  get closedAt(): Date {
    return this.closed_at;
  }

  // expire_at alias
  @HideField()
  expire_at: Date;

  @Field(() => Date, {
    description: 'Identifies the date and time when the offer expire.',
    nullable: true
  })
  @Expose()
  get expireAt(): Date {
    return this.expire_at;
  }

  // updated_at alias
  @HideField()
  updated_at: Date;

  @Field(() => Date, {
    description:
      'Identifies the date and time when the object was last updated.'
  })
  @Expose()
  get updatedAt(): Date {
    return this.updated_at;
  }

  // created_at alias
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
