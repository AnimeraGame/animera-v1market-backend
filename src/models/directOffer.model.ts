import {
  Field,
  Float,
  HideField,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import { users } from '@prisma/client';
import { Expose } from 'class-transformer';
import { BaseModel } from './base.model';
import { Nft } from './nft.model';
import { User } from './user.model';

export enum OfferStatus {
  active = 0,
  finished = 1
}

registerEnumType(OfferStatus, {
  name: 'OfferStatus',
  description: 'Possible offers statuses'
});

@ObjectType()
export class DirectOffer extends BaseModel {
  constructor(partial: Partial<DirectOffer>) {
    super();

    this.fromUser = partial.from_user ? new User(partial.from_user) : null;

    this.winner = partial.winner ? new User(partial.winner) : null;

    Object.assign(this, partial);
  }

  @HideField()
  bundle_id?: string;

  @HideField()
  nft_id?: string;

  @HideField()
  pricing_id: string;

  @HideField()
  from: string;

  @HideField()
  offer_id: string;

  @Field()
  tx: string;

  @Field(() => OfferStatus)
  status: OfferStatus;

  @HideField()
  buy_tx: string | null;

  @Field(() => String, { nullable: true })
  @Expose()
  get buyTx(): string | null {
    return this.buy_tx;
  }

  @Field(() => String)
  @Expose()
  get offerId(): string {
    return this.offer_id;
  }

  @Field(() => Float)
  price: number;

  @Field()
  currency: string;

  @Field()
  type: number;

  @Field(() => Nft, { nullable: true })
  nft?: Nft | null;

  // from_user aliases
  @HideField()
  from_user: users;

  @Field({ nullable: true })
  fromUser: User | null;

  @Field({ nullable: true })
  winner: User | null;

  // winner_id alias
  @HideField()
  winner_id: string;

  @Field(() => String, { nullable: true })
  @Expose()
  get winnerId(): string {
    return this.winner_id;
  }

  // closed_at alias
  @HideField()
  closed_at: Date;

  @Field(() => Date, {
    description: 'Identifies the date and time when the object was created.',
    nullable: true
  })
  @Expose()
  get closedAt(): Date {
    return this.closed_at;
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
