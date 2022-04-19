import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { sales, nfts } from '@prisma/client';
import { NftMetadata } from 'src/models/nft_metadata.model';
import { PrismaService } from './prisma.service';
import { Nft } from '../models/nft.model';
import { User } from '../models/user.model';
import { Sale } from 'src/models/sale.model';
import { CreateSaleInput } from 'src/resolvers/sale/dto/create-sale.input';
import { UpdateSaleInput } from 'src/resolvers/sale/dto/update-sale.input';
import { OrderByInput } from 'src/resolvers/sale/dto/order-by.input';
import { PriceWhereInput } from 'src/resolvers/sale/dto/price-where.input';

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) {}

  async findSalesByWallet(
    wallet: string
  ): Promise<{ sales: Sale[]; _count: number }> {
    const sales = await this.prisma.sales.findMany({
      where: {
        seller: wallet
      },
      include: {
        nft: {
          include: {
            nft_metadata: true
          }
        }
      }
    });

    const res = sales.map(
      sale =>
        new Sale({
          ...sale,
          nft: new Nft({
            ...sale.nft,
            nftMetadata: new NftMetadata(sale.nft.nft_metadata)
          }),
        })
    );

    return { sales: res, _count: res.length };
  }

  async findSaleById(id: string): Promise<Sale> {
    const sale = await this.prisma.sales.findUnique({
      where: {
        id
      },
      include: {
        nft: {
            include: {
                nft_metadata: true
            }
        }
      }
    });

    if (!sale) {
      throw new NotFoundException('There is no nft with this id');
    }

    const res = new Sale({
      ...sale,
      nft: new Nft({
        ...sale.nft,
        nft_metadata: sale.nft.nft_metadata
      })
    });

    return res;
  }

  async findSalesBy(
    take?: number,
    skip?: number,
    orderBy?: OrderByInput,
    price?: PriceWhereInput,
    status = 0,
    searchText = null
  ): Promise<{ sales: Sale[]; _count: number }> {
    const saleList = await this.prisma.sales.findMany({
      where: {
        status,
        price: {
          gt: price.gt ? price.gt : 0,
          lt: price.lt ? price.lt : 100000000000000
        }
      },
      include: {
        nft: {
          include: {
            nft_metadata: true
          }
        }
      },
      orderBy: orderBy.price ? { price: (orderBy.price === 'desc') ? 'desc' : 'asc' } : { created_at: 'desc' },
      take: take || 100,
      skip: skip || 0
    });

    const res = saleList.map(
      offer =>
        new Sale({
          ...offer,
          nft: new Nft({
            ...offer.nft,
            nft_metadata: offer.nft.nft_metadata
          }),
        })
    );

    return { sales: res, _count: res.length };
  }

  async createSale(seller: User, data: CreateSaleInput): Promise<sales> {
      try {
        if (seller.walletAddress.toLowerCase() !== data.sellerWalletAddress.toLowerCase()) {
            throw new BadRequestException("API caller is not offer creator");
        }
        const nft = await this.prisma.nfts.findFirst({
          where: {
            id: data.nftId
          }
        });
        if (!nft) {
          throw new BadRequestException("There is no NFT with this id");
        }
        if (nft.owner_wallet_address.toLowerCase() !== seller.walletAddress.toLowerCase()) {
          throw new BadRequestException("Api caller is not owner of this NFT");
        }
        const oldSale = await this.prisma.sales.findMany({
          where: {
            token_id: data.tokenId
          }
        });
        if (oldSale.length > 0) {
          throw new BadRequestException("This nft is already on marketplace");
        }

        const sale = await this.prisma.sales.create({
            data: {
                nft_id: data.nftId,
                token_id: data.tokenId,
                token_address: data.tokenAddress,
                seller: seller.walletAddress,
                price: data.sellerPrice,
                seller_signature: data.signature,
                created_at: new Date(Date.now()),
                updated_at: new Date(Date.now()),
                expire_at: new Date(data.sellerDeadline),
                status: data.status ? data.status : 0
            }
        });

        await this.prisma.nfts.update({
          data: {
            is_on_marketplace: true
          },
          where: {
            id: data.nftId
          }
        });

        return sale;
      } catch(e) {
          throw new BadRequestException(e.message);
      }
  }

  async updateSale(owner: User, data: UpdateSaleInput): Promise<sales> {
    try {
      if (owner.walletAddress !== data.sellerWalletAddress) {
        throw new BadRequestException('Caller is not owner of this sale');
      }
      const sale = await this.prisma.sales.update({
        data: {
          nft_id: data.nftId,
          token_id: data.tokenId,
          token_address: data.tokenAddress,
          seller: data.sellerWalletAddress,
          price: data.sellerPrice,
          seller_signature: data.signature,
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
          expire_at: new Date(data.sellerDeadline),
          status: data.status ? data.status : 0
        },
        where: {
          id: data.id
        }
      });
      return sale;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
