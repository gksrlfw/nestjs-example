import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, User } from '@src/core/autogen/schema.graphql';
import { UserService } from '@src/modules/user/user.service';
import { Logger } from '@nestjs/common';

@Resolver()
export class UserResolver {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.create(input);
  }
}
