import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { history } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { History } from 'src/models/history.model';
import { Histories } from 'src/models/histories.model';
import { AddHistoryInput } from 'src/resolvers/history/dto/add-history.input';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  async getHistories(tokenId: number): Promise<Histories> {
    try {
      const histories = await this.prisma.history.findMany({
        where: {
          tokenId
        },
        orderBy: {
          created_at: 'asc'
        }
      });

      const totalCount = await this.prisma.history.count({
        where: {
          tokenId
        }
      });

      if (histories.length > 0) {
        const historyObjects = histories.map(history => {
          return new History(history);
        });
        return new Histories(historyObjects, totalCount);
      } else {
        return new Histories([], 0);
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
