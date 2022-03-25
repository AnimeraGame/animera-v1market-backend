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
import { DirectOffer } from 'src/models/directOffer.model';
import { DirectOffers } from 'src/models/offers.model';
import { CreateOfferInput } from './dto/create-offer.input';
import { UpdateOfferInput } from './dto/update-offer.input';

@Resolver(() => DirectOffer)
export class OfferResolver {
  constructor(private offerService: OfferService, private prisma: PrismaService) {}

  @Query(() => DirectOffers)
  async findOfferByWalletAddress(
    @Args('wallet') wallet: string
  ): Promise<DirectOffers> {
    const { offers, _count } = await this.offerService.findOffersByWallet(wallet);

    return new DirectOffers({ offers, _count: _count || 0 });
  }

  @Query(() => DirectOffer, { name: 'offer' })
  async findOfferById(
    @Args('id', { nullable: true }) id: string
  ): Promise<DirectOffer> | null {
    const offer = await this.offerService.findOfferById(id);
    return offer ? new DirectOffer(offer) : null;
  }

  @Query(() => DirectOffers, {})
  async findOffers(
    @Args('page', { nullable: true }) page: number | null,
    @Args('onePage', { nullable: true }) onePage: number | null,
    @Args('sortList', { nullable: true }) sortList: string | null,
    @Args('status', { nullable: true }) status: number | null,
    @Args('searchText', { nullable: true }) searchText: string | null
  ): Promise<DirectOffers> {
    const { offers, _count } = await this.offerService.findOffersBy(
      onePage,
      page,
      sortList,
      status,
      searchText
    );
    return new DirectOffers({ offers, _count: _count || 0 });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DirectOffer)
  async createOffer(
      @UserEntity() user: User,
      @Args('data') data: CreateOfferInput
  ) {
      return new DirectOffer(
          await this.offerService.createOffer(user, data)
      )
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DirectOffer)
  async updateOffer(
      @UserEntity() user: User,
      @Args('data') data: UpdateOfferInput
  ) {
      return new DirectOffer(
          await this.offerService.updateOffer(user, data)
      )
  }
}
