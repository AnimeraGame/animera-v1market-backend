import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { nfts } from '@prisma/client';
import { NftMetadata } from 'src/models/nft_metadata.model';
import { PrismaService } from './prisma.service';
import { Nft } from '../models/nft.model';
import { User } from '../models/user.model';
import { Sale, SaleStatus } from 'src/models/sale.model';

@Injectable()
export class NftService {
  constructor(private prisma: PrismaService) {}

  async findNftsByWallet(wallet: string): Promise<any> {
    const nft = await this.prisma.nfts.findFirst({
      where: {
        owner_wallet_address: {
          equals: wallet,
          mode: 'insensitive'
        }
      }
    });

    const nftMetadata = nft
      ? (await this.prisma.nft_metadata.findFirst({
          where: {
            id: nft.token_id
          }
        })) || { metadata: null }
      : { metadata: null };

    return { ...nft, nftMetadata: nftMetadata.metadata };
  }

  async findNftById(id: string): Promise<Nft> {
    const nft = await this.prisma.nfts.findUnique({
      where: {
        id
      },
      include: {
        nft_metadata: true
      }
    });

    if (!nft) {
      throw new NotFoundException('There is no nft with this id');
    }

    return new Nft(nft);
  }

  async getTotalNftCount(): Promise<number> {
    const total = await this.prisma.nfts.count();

    return total;
  }

  async getNftOwner(nft_id: string): Promise<User | null> {
    const nft = await this.prisma.nfts.findFirst({
      where: { token_id: nft_id },
    });
    if (!nft) return null;

    return this.prisma.users
      .findFirst({
        where: {
          walletAddress: {
            equals: nft.owner_wallet_address,
            mode: 'insensitive'
          }
        }
      })
      .then(user => (user ? new User(user) : null));
  }

  async getNftListByUserId(user_id: string): Promise<{ nfts: Nft[]; nftsCount: number }> | null {
    const user = await this.prisma.users.findFirst({
      where: {
        id: user_id
      }
    });

    if (!user) {
      throw new NotFoundException('There is no such user with this user id');
    }

    const nftsObjs = await this.prisma.nfts.findMany({
      where: {
        owner_wallet_address: {
					contains: user.walletAddress,
					mode: 'insensitive'
				}
      },
			include: {
				nft_metadata: true
			}
    });

    const nfts = [];
    for (let i=0; i<nftsObjs.length; i++) {
      const offer = await this.prisma.sales.findFirst({
        where: {
          nft_id: nftsObjs[i].id,
          status: SaleStatus.active
        }
      });
      const nft = new Nft(nftsObjs[i]);
      if (offer) {
        nft.directOffer = new Sale(offer);
      }
      nfts.push(nft);
    }

    return { nfts: nfts, nftsCount: nfts.length };
  }

  async findNftsAll(
    take?: number,
    skip?: number,
    sortList = null,
    searchText = null
  ): Promise<{ nfts: Nft[]; _count: number }> {
    const nftList = await this.prisma.nfts.findMany({
      include: {
        nft_metadata: true
      },
      orderBy: JSON.parse(sortList),
      take: take || 100,
      skip: skip || 0
    });

    const res = nftList.map(
      nft =>
        new Nft({
          ...nft,
          nft_metadata: nft.nft_metadata
        })
    );

    return { nfts: res, _count: res.length };
  }

  async updateNftMetaData(id: string, data: string): Promise<NftMetadata> {
    try {
      const nftMeta = await this.prisma.nft_metadata.update({
        data: {
          metadata: data,
          updated_at: new Date(Date.now())
        },
        where: {
          id
        }
      });

      return new NftMetadata(nftMeta);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async updateSaleInfo(id: string, data: string): Promise<Nft> {
    try {
      const nft = await this.prisma.nfts.update({
        data: {
          sale_info: data,
          updated_at: new Date(Date.now())
        },
        where: {
          id
        }
      });

      return new Nft(nft);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findOwner({ id }: Partial<nfts>): Promise<User | null> {
    const nft = await this.prisma.nfts.findFirst({
      where: { token_id: id }
    });
    if (!nft) return null;

    return this.prisma.users
      .findFirst({
        where: {
          walletAddress: {
            equals: nft.owner_wallet_address,
            mode: 'insensitive'
          }
        }
      })
      .then(user => (user ? new User(user) : null));
  }
}
