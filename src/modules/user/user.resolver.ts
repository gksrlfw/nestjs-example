import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateUserInput, Post, User } from '@src/core/autogen/schema.graphql';
import { UserService } from '@src/modules/user/user.service';
import { Logger } from '@nestjs/common';
import { PostService } from '@src/modules/post/post.service';

@Resolver('User')
export class UserResolver {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  /**
   *
   */
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return (await this.userService.getUsers()).map((user) => user.toUser());
  }

  /**
   *
   * @param input
   */
  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return (await this.userService.create(input)).toUser();
  }

  /**
   *
   * @param user
   */
  @ResolveField('posts')
  async posts(@Parent() user: User): Promise<Post[]> {
    this.logger.debug(`posts(user: ${JSON.stringify(user)})`);
    return (await this.postService.getPostsByUser(user.id)).map((post) =>
      post.toPost(),
    );
  }
}
