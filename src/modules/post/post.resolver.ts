import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePostInput, Post, User } from '@src/core/autogen/schema.graphql';
import { Logger } from '@nestjs/common';
import { PostService } from '@src/modules/post/post.service';

@Resolver()
export class PostResolver {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  async getPosts(): Promise<Post[]> {
    return (await this.postService.getPosts()).map((post) => post.toPost());
  }

  @Mutation(() => User)
  async createPost(@Args('input') input: CreatePostInput): Promise<Post> {
    return (await this.postService.create(input)).toPost();
  }
}
