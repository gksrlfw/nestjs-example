import { Post } from '@src/core/autogen/schema.graphql';
import { PostEntity } from '@src/modules/post/entities/post.entity';

/**
 * Entity 테스트입니다.
 */
describe('PostEntity test', () => {
  // TODO
  //  entity 캡슐화에 대해 고민해야합니다.

  let instance: PostEntity;

  beforeEach(() => {
    instance = new PostEntity();
  });

  it('toPost 테스트', () => {
    instance.id = 1;
    instance.title = 'first';

    const input = instance.toPost();
    const result = Object.assign(new Post(), {
      id: 1,
      title: 'first',
    });

    expect(input).toEqual(result);
  });
});
