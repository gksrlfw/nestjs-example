import { Injectable, Logger } from '@nestjs/common';
import { CreatePostInput } from '@src/core/autogen/schema.graphql';
import { PostRepository } from '@src/modules/post/repositories/post.repository';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { PostEntity } from '@src/modules/post/entities/post.entity';

@Injectable()
export class PostService {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly postRepository: PostRepository) {}

  /**
   *
   */
  async getPosts(): Promise<PostEntity[]> {
    return this.postRepository.getAllPosts();
  }

  /**
   *
   * @param name
   */
  async create({
    title,
    content,
    userId,
  }: CreatePostInput): Promise<PostEntity> {
    const instance = this.postRepository.create({
      title,
      content,
      user: {
        id: userId,
      } as UserEntity,
    });

    return this.postRepository.save(instance);
  }

  /**
   *
   * @param userIds
   */
  getPostsByUsers(userIds: number[]): Promise<PostEntity[]> {
    return this.postRepository.getAllPostsByUsers(userIds);
  }
}
