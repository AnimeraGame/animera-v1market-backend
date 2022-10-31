import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { HistoryService } from 'src/services/history.service';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { User } from '../../models/user.model';
import { UserEntity } from '../../decorators/user.decorator';
import { History } from 'src/models/history.model';
import { Histories } from 'src/models/histories.model';
import { AddHistoryInput } from './dto/add-history.input';

@Resolver(() => History)
export class HistoryResolver {
  constructor(private historyService: HistoryService) {}

  @Mutation(() => Histories)
  async getHistories(@Args('tokenId') tokenId: number) {
    return await this.historyService.getHistories(tokenId);
  }
}
