import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TestService } from 'src/services/test.service';

@Resolver()
export class TestResolver {
  constructor(private testService: TestService) {}

  @Mutation(() => BigInt)
  async createFakeAccounts(): Promise<BigInt> {
    await this.testService.createFakeAccounts(20);
    return BigInt(20);
  }
}
