import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { OfferResolver } from './offer.resolver';
import { OfferService } from '../../services/offer.service';

@Module({
  providers: [OfferResolver, OfferService, PrismaService]
})
export class OfferModule {}
