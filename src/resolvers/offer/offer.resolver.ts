import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OfferService } from 'src/services/offer.service';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { Nfts } from '../../models/nfts.model';
import { PrismaService } from '../../services/prisma.service';
import { User } from '../../models/user.model';
import { UserEntity } from '../../decorators/user.decorator';
import { CreateOfferInput } from './dto/create-offer.input';
import { UpdateOfferInput } from './dto/update-offer.input';
import { OrderByInput } from './dto/order-by.input';
import { PriceWhereInput } from './dto/price-where.input';
import { Offer } from 'src/models/offer.model';
import { Offers } from 'src/models/offers.model';

@Resolver(() => Offer)
export class OfferResolver {
  constructor(private offerService: OfferService, private prisma: PrismaService) {}

  @Query(() => Offers)
  async findOfferByWalletAddress(
    @Args('wallet') wallet: string
  ): Promise<Offers> {
    const { offers, _count } = await this.offerService.findOffersByWallet(wallet);

    return new Offers({ offers, _count: _count || 0 });
  }

  @Query(() => Offer, { name: 'offer' })
  async findOfferById(
    @Args('id', { nullable: true }) id: string
  ): Promise<Offer> | null {
    const offer = await this.offerService.findOfferById(id);
    return offer ? new Offer(offer) : null;
  }

  @Query(() => Offers, {})
  async findOffers(
    @Args('page', { nullable: true }) page: number | null,
    @Args('onePage', { nullable: true }) onePage: number | null,
    @Args('orderBy', { nullable: true }) orderBy: OrderByInput,
    @Args('price', { nullable: true }) price: PriceWhereInput,
    @Args('status', { nullable: true }) status: number | null,
    @Args('searchText', { nullable: true }) searchText: string | null
  ): Promise<Offers> {
    const { offers, _count } = await this.offerService.findOffersBy(
      onePage,
      page,
      orderBy,
      price,
      status,
      searchText
    );
    return new Offers({ offers, _count: _count || 0 });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Offer)
  async createOffer(
      @UserEntity() user: User,
      @Args('data') data: CreateOfferInput
  ) {
      return new Offer(
          await this.offerService.createOffer(user, data)
      )
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Offer)
  async updateOffer(
      @UserEntity() user: User,
      @Args('data') data: UpdateOfferInput
  ) {
      return new Offer(
          await this.offerService.updateOffer(user, data)
      )
  }
}