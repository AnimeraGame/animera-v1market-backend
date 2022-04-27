import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { estates, nfts } from '@prisma/client';
import { NftMetadata } from 'src/models/nft_metadata.model';
import { PrismaService } from './prisma.service';
import { Nft } from '../models/nft.model';
import { User } from '../models/user.model';
import { Estate, EstateStatus, EstateType } from 'src/models/estate.model';
import { CreateEstateInput } from 'src/resolvers/estates/dto/create-estate.input';
import { UpdateEstateInput } from 'src/resolvers/estates/dto/update-estate.input';
import { OrderByInput } from 'src/resolvers/estates/dto/order-by.input';
import { PriceWhereInput } from 'src/resolvers/estates/dto/price-where.input';

@Injectable()
export class EstateService {
  constructor(private prisma: PrismaService) {}

  async findOffersByWallet(
    wallet: string,
    type: number
  ): Promise<{ estates: Estate[]; _count: number }> {
    // Offer
    if (type == 0) {
      const estateArray = await this.prisma.estates.findMany({
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

      const res = estateArray.map(
        estate =>
          new Estate({
            ...estate,
            nft: new Nft({
              ...estate.nft,
              nftMetadata: new NftMetadata(estate.nft.nft_metadata)
            })
          })
      );

      return { estates: res, _count: res.length };
    } else {
      // My offer
      const estateArray = await this.prisma.estates.findMany({
        where: {
          buyer: wallet
        },
        include: {
          nft: {
            include: {
              nft_metadata: true
            }
          }
        }
      });

      const res = estateArray.map(
        estate =>
          new Estate({
            ...estate,
            nft: new Nft({
              ...estate.nft,
              nftMetadata: new NftMetadata(estate.nft.nft_metadata)
            })
          })
      );

      return { estates: res, _count: res.length };
    }
  }

  async findSalesByWallet(
    wallet: string
  ): Promise<{ estates: Estate[]; _count: number }> {
    const estateArray = await this.prisma.estates.findMany({
      where: {
        seller: wallet,
        type: EstateType.sale
      },
      include: {
        nft: {
          include: {
            nft_metadata: true
          }
        }
      }
    });

    const res = estateArray.map(
      estate =>
        new Estate({
          ...estate,
          nft: new Nft({
            ...estate.nft,
            nftMetadata: new NftMetadata(estate.nft.nft_metadata)
          })
        })
    );

    return { estates: res, _count: res.length };
  }

  async findEstateById(id: number): Promise<Estate> {
    const estate = await this.prisma.estates.findUnique({
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

    if (!estate) {
      throw new NotFoundException('There is no nft with this id');
    }

    const res = new Estate({
      ...estate,
      nft: new Nft({
        ...estate.nft,
        nft_metadata: estate.nft.nft_metadata
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
  ): Promise<{ estates: Estate[]; _count: number }> {
    const estateList = await this.prisma.estates.findMany({
      where: {
        status,
        type: EstateType.sale,
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
      orderBy: orderBy.price
        ? { price: orderBy.price === 'desc' ? 'desc' : 'asc' }
        : { created_at: 'desc' },
      take: take || 100,
      skip: skip || 0
    });

    const res = estateList.map(
      offer =>
        new Estate({
          ...offer,
          nft: new Nft({
            ...offer.nft,
            nft_metadata: offer.nft.nft_metadata
          })
        })
    );

    return { estates: res, _count: res.length };
  }

  async findOffersBy(
    wallet: string,
    take?: number,
    skip?: number,
    orderBy?: OrderByInput,
    price?: PriceWhereInput,
    status = 0,
    searchText = null
  ): Promise<{ offers: Estate[]; _count: number }> {
    const offerList = await this.prisma.estates.findMany({
      where: {
        status,
        type: EstateType.offer,
        seller: {
          equals: wallet,
          mode: 'insensitive'
        },
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
      orderBy: orderBy.price
        ? { price: orderBy.price === 'desc' ? 'desc' : 'asc' }
        : { created_at: 'desc' },
      take: take || 100,
      skip: skip || 0
    });

    const res = offerList.map(
      offer =>
        new Estate({
          ...offer,
          nft: new Nft({
            ...offer.nft,
            nft_metadata: offer.nft.nft_metadata
          })
        })
    );

    return { offers: res, _count: res.length };
  }

  async findMyOffersBy(
    wallet: string,
    take?: number,
    skip?: number,
    orderBy?: OrderByInput,
    price?: PriceWhereInput,
    status = 0,
    searchText = null
  ): Promise<{ myOffers: Estate[]; _count: number }> {
    const offerList = await this.prisma.estates.findMany({
      where: {
        status,
        type: EstateType.offer,
        buyer: {
          equals: wallet,
          mode: 'insensitive'
        },
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
      orderBy: orderBy.price
        ? { price: orderBy.price === 'desc' ? 'desc' : 'asc' }
        : { created_at: 'desc' },
      take: take || 100,
      skip: skip || 0
    });

    const res = offerList.map(
      offer =>
        new Estate({
          ...offer,
          nft: new Nft({
            ...offer.nft,
            nft_metadata: offer.nft.nft_metadata
          })
        })
    );

    return { myOffers: res, _count: res.length };
  }

  async createEstate(user: User, data: CreateEstateInput): Promise<estates> {
    try {
      const nft = await this.prisma.nfts.findFirst({
        where: {
          id: data.nft_id
        }
      });
      if (!nft) {
        throw new BadRequestException('There is no NFT with this id');
      }
      if (data.type === EstateType.sale) {
        if (
          user.walletAddress.toLowerCase() !==
          data.seller.toLowerCase()
        ) {
          throw new BadRequestException('API caller is not sale creator');
        }
        const oldEstate = await this.prisma.estates.findMany({
          where: {
            nft_id: data.nft_id,
            status: EstateStatus.active
          }
        });
        if (oldEstate.length > 0) {
          throw new BadRequestException('This nft is already on marketplace');
        }
        if (
          nft.owner_wallet_address.toLowerCase() !== user.walletAddress.toLowerCase()
        ) {
          throw new BadRequestException('Api caller is not owner of this NFT');
        }
      } else {
        if (
          user.walletAddress.toLowerCase() !==
          data.buyer.toLowerCase()
        ) {
          throw new BadRequestException('API caller is not offer creator');
        }
        if (
          nft.owner_wallet_address.toLowerCase() === user.walletAddress.toLowerCase()
        ) {
          throw new BadRequestException('Users cannot make offer to their own NFT');
        }
      }

      const estate = await this.prisma.estates.create({
        data: {
          nft_id: data.nft_id,
          type: data.type,
          token_address: data.token_address,
          seller: data.seller,
          buyer: data.buyer,
          price: data.price,
          seller_signature: data.seller_signature,
          buyer_signature: data.buyer_signature,
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
          expire_at: new Date(data.expire_at),
          status: data.status ? data.status : 0
        }
      });

      await this.prisma.nfts.update({
        data: {
          is_on_marketplace: true
        },
        where: {
          id: data.nft_id
        }
      });

      return estate;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async updateEstate(owner: User, data: UpdateEstateInput): Promise<estates> {
    try {
      const currentEstate = await this.prisma.estates.findUnique({
        where: { id: data.id }
      });

      if (currentEstate.type === EstateType.sale  && owner.walletAddress.toLowerCase() !== currentEstate.seller.toLowerCase()) {
        throw new BadRequestException('Caller is not owner of this sale');
      }

      if (currentEstate.type === EstateType.offer && owner.walletAddress.toLowerCase() !== currentEstate.buyer.toLowerCase()) {
        throw new BadRequestException('Caller is not owner of this offer');
      }
      const estate = await this.prisma.estates.update({
        data,
        where: {
          id: data.id
        }
      });
      return estate;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
