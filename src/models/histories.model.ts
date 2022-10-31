import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { History } from './history.model';

@ObjectType()
export class Histories {
  constructor(_histories: History[], _totalCount: number) {
    this.histories = _histories;
    this.totalCount = _totalCount;
  }
  histories: History[];

  totalCount: number;
}
