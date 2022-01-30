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
import * as DataLoader from 'dataloader';

@Resolver('User')
export class UserResolver {
  private readonly logger: Logger = new Logger(this.constructor.name);
  private userLoader: DataLoader<number, Post[]>;

  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {
    // fixme
    //  this 가 binding 되지 않습니다??
    // this.userLoader = new DataLoader(this.batchFnOnPosts)
    this.userLoader = new DataLoader<number, Post[]>(
      async (keys) => await this.batchFnOnPosts(keys),
    );
  }

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
    return this.userLoader.load(user.id);
    // return this.userLoader.load.bind(this, user.id);
  }

  /**
   *
   * @param keys
   */
  async batchFnOnPosts(keys: readonly number[]): Promise<(null | Post[])[]> {
    this.logger.debug(`batchFnOnPosts(keys: ${keys})`);
    const posts = await this.postService.getPostsByUsers(keys as number[]);
    return keys.map((key) => {
      const postsOnKey = posts.filter((post) => post.userId === key);
      if (!postsOnKey || !postsOnKey.length) {
        return null;
      }

      return postsOnKey.map((post) => post.toPost());
    });
  }
}
