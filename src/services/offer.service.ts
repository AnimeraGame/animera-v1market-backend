import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { direct_offers, nfts } from '@prisma/client';
import { NftMetadata } from 'src/models/nft_metadata.model';
import { PrismaService } from './prisma.service';
import { Nft } from '../models/nft.model';
import { User } from '../models/user.model';
import { DirectOffer } from 'src/models/directOffer.model';
import { CreateOfferInput } from 'src/resolvers/offer/dto/create-offer.input';
import { UpdateOfferInput } from 'src/resolvers/offer/dto/update-offer.input';

@Injectable()
export class OfferService {
  constructor(private prisma: PrismaService) {}

  async findOffersByWallet(
    wallet: string
  ): Promise<{ offers: DirectOffer[]; _count: number }> {
    const offers = await this.prisma.direct_offers.findMany({
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
        new DirectOffer({
          ...offer,
          nft: new Nft({
            ...offer.nft,
            nftMetadata: new NftMetadata(offer.nft.nft_metadata)
          }),
        })
    );

    return { offers: res, _count: res.length };
  }

  async findOfferById(id: string): Promise<DirectOffer> {
    const offer = await this.prisma.direct_offers.findUnique({
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

    const res = new DirectOffer({
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
    sortList = null,
    status = 0,
    searchText = null
  ): Promise<{ offers: DirectOffer[]; _count: number }> {
    const offerList = await this.prisma.direct_offers.findMany({
      where: {
        status
      },
      include: {
        nft: {
          include: {
            nft_metadata: true
          }
        }
      },
      orderBy: {
        created_at: sortList,
      },
      take: take || 100,
      skip: skip || 0
    });

    const res = offerList.map(
      offer =>
        new DirectOffer({
          ...offer,
          nft: new Nft({
            ...offer.nft,
            nft_metadata: offer.nft.nft_metadata
          }),
        })
    );

    return { offers: res, _count: res.length };
  }

  async createOffer(seller: User, data: CreateOfferInput): Promise<direct_offers> {
      try {
        if (seller.walletAddress !== data.sellerWalletAddress) {
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
        if (nft.owner_wallet_address !== seller.walletAddress) {
          throw new BadRequestException("Api caller is not owner of this NFT");
        }
        const oldOffer = await this.prisma.direct_offers.findMany({
          where: {
            token_id: data.tokenId
          }
        });
        if (oldOffer.length > 0) {
          throw new BadRequestException("This nft is already on marketplace");
        }

        const offer = await this.prisma.direct_offers.create({
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

  async updateOffer(owner: User, data: UpdateOfferInput): Promise<direct_offers> {
    try {
      if (owner.walletAddress !== data.sellerWalletAddress) {
        throw new BadRequestException('Caller is not owner of this offer');
      }
      const newOffer = await this.prisma.direct_offers.update({
        data: {
          nft_id: data.nftId,
          token_id: data.tokenId,
          token_address: data.tokenAddress,
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

      if (newOffer) {

      }

      return newOffer;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
