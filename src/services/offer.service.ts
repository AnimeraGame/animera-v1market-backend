import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { offers, nfts } from '@prisma/client';
import { NftMetadata } from 'src/models/nft_metadata.model';
import { PrismaService } from './prisma.service';
import { Nft } from '../models/nft.model';
import { User } from '../models/user.model';
import { Offer } from 'src/models/offer.model';
import { CreateOfferInput } from 'src/resolvers/offer/dto/create-offer.input';
import { UpdateOfferInput } from 'src/resolvers/offer/dto/update-offer.input';
import { OrderByInput } from 'src/resolvers/sale/dto/order-by.input';
import { PriceWhereInput } from 'src/resolvers/sale/dto/price-where.input';

@Injectable()
export class OfferService {
  constructor(private prisma: PrismaService) {}

  async findOffersByWallet(
    wallet: string
  ): Promise<{ offers: Offer[]; _count: number }> {
    const offers = await this.prisma.offers.findMany({
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

    const res = offers.map(
      offer =>
        new Offer({
          ...offer,
          nft: new Nft({
            ...offer.nft,
            nftMetadata: new NftMetadata(offer.nft.nft_metadata)
          }),
        })
    );

    return { offers: res, _count: res.length };
  }

  async findOfferById(id: string): Promise<Offer> {
    const offer = await this.prisma.offers.findUnique({
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

    if (!offer) {
      throw new NotFoundException('There is no nft with this id');
    }

    const res = new Offer({
      ...offer,
      nft: new Nft({
        ...offer.nft,
        nft_metadata: offer.nft.nft_metadata
      })
    });

    return res;
  }

  async findOffersBy(
    take?: number,
    skip?: number,
    orderBy?: OrderByInput,
    price?: PriceWhereInput,
    status = 0,
    searchText = null
  ): Promise<{ offers: Offer[]; _count: number }> {
    const offerList = await this.prisma.offers.findMany({
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

    const res = offerList.map(
      offer =>
        new Offer({
          ...offer,
          nft: new Nft({
            ...offer.nft,
            nft_metadata: offer.nft.nft_metadata
          }),
        })
    );

    return { offers: res, _count: res.length };
  }

  async createOffer(seller: User, data: CreateOfferInput): Promise<offers> {
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
        const oldOffer = await this.prisma.offers.findMany({
          where: {
            token_id: data.tokenId
          }
        });
        if (oldOffer.length > 0) {
          throw new BadRequestException("This nft is already on marketplace");
        }

        const offer = await this.prisma.offers.create({
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

        return offer;
      } catch(e) {
          throw new BadRequestException(e.message);
      }
  }

  async updateOffer(owner: User, data: UpdateOfferInput): Promise<offers> {
    try {
      if (owner.walletAddress !== data.sellerWalletAddress) {
        throw new BadRequestException('Caller is not owner of this sale');
      }
      const offer = await this.prisma.offers.update({
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
      return offer;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
