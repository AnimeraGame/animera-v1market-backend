import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { SaleResolver } from './sale.resolver';
import { SaleService } from '../../services/sale.service';

@Module({
  providers: [SaleResolver, SaleService, PrismaService]
})
export class SaleModule {}
