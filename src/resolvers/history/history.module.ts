import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { HistoryResolver } from './history.resolver';
import { HistoryService } from '../../services/history.service';

@Module({
  providers: [HistoryResolver, HistoryService, PrismaService]
})
export class HistoryModule {}
