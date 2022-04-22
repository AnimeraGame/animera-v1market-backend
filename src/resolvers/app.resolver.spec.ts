import { Test, TestingModule } from '@nestjs/testing';
import { AppResolver } from './app.resolver';
import { AppService } from '../services/app.service';
import { Chance } from 'chance';

const chance = new Chance();

describe('AppResolver', () => {
  let appResolver: AppResolver;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppResolver, AppService]
    }).compile();

    appResolver = app.get<AppResolver>(AppResolver);
  });
});
