import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { SaleService } from 'src/services/sale.service';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { Nfts } from '../../models/nfts.model';
import { PrismaService } from '../../services/prisma.service';
import { User } from '../../models/user.model';
import { UserEntity } from '../../decorators/user.decorator';
import { Sale } from 'src/models/sale.model';
import { Sales } from 'src/models/sales.model';
import { CreateSaleInput } from './dto/create-sale.input';
import { UpdateSaleInput } from './dto/update-sale.input';
import { OrderByInput } from './dto/order-by.input';
import { PriceWhereInput } from './dto/price-where.input';

@Resolver(() => Sale)
export class SaleResolver {
  constructor(private saleService: SaleService, private prisma: PrismaService) {}

  @Query(() => Sales)
  async findOfferByWalletAddress(
    @Args('wallet') wallet: string
  ): Promise<Sales> {
    const { sales, _count } = await this.saleService.findSalesByWallet(wallet);

    return new Sales({ sales, _count: _count || 0 });
  }

  @Query(() => Sale, { name: 'offer' })
  async findOfferById(
    @Args('id', { nullable: true }) id: string
  ): Promise<Sale> | null {
    const offer = await this.saleService.findSaleById(id);
    return offer ? new Sale(offer) : null;
  }

  @Query(() => Sales, {})
  async findOffers(
    @Args('page', { nullable: true }) page: number | null,
    @Args('onePage', { nullable: true }) onePage: number | null,
    @Args('orderBy', { nullable: true }) orderBy: OrderByInput,
    @Args('price', { nullable: true }) price: PriceWhereInput,
    @Args('status', { nullable: true }) status: number | null,
    @Args('searchText', { nullable: true }) searchText: string | null
  ): Promise<Sales> {
    const { sales, _count } = await this.saleService.findSalesBy(
      onePage,
      page,
      orderBy,
      price,
      status,
      searchText
    );
    return new Sales({ sales, _count: _count || 0 });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Sale)
  async createSale(
      @UserEntity() user: User,
      @Args('data') data: CreateSaleInput
  ) {
      return new Sale(
          await this.saleService.createSale(user, data)
      )
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Sale)
  async updateSale(
      @UserEntity() user: User,
      @Args('data') data: UpdateSaleInput
  ) {
      return new Sale(
          await this.saleService.updateSale(user, data)
      )
  }
}
