import { EntityRepository, Repository } from 'typeorm';
import { PostEntity } from '@src/modules/post/entities/post.entity';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  /**
   *
   */
  toString(): string {
    return 'PostRepository';
  }

  /**
   *
   * @param id
   */
  getPostById(id: number): Promise<PostEntity> {
    return this.findOne(id);
  }

  /**
   *
   * @param ids
   */
  getPostsByIds(ids: number[]): Promise<PostEntity[]> {
    return this.findByIds(ids);
  }

  /**
   *
   */
  getAllPosts(): Promise<PostEntity[]> {
    return this.createQueryBuilder('p').getMany();
  }

  /**
   *
   * @param userId
   */
  getAllPostsByUser(userId: number): Promise<PostEntity[]> {
    return this.createQueryBuilder('p')
      .where('user_id = :userId', { userId })
      .getMany();
  }

  /**
   *
   * @param userIds
   */
  getAllPostsByUsers(userIds): Promise<PostEntity[]> {
    return this.createQueryBuilder('p')
      .where('user_id in (:userIds)', { userIds })
      .getMany();
  }
}
