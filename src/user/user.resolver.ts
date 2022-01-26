import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  @Query(() => Boolean)
  async getUsers(): Promise<boolean> {
    return true;
  }
}
