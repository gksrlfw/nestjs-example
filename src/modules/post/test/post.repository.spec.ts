import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CoreModule } from '@src/core/core.module';
import { PostModule } from '@src/modules/post/post.module';
import { PostRepository } from '@src/modules/post/repositories/post.repository';

/**
 * Repository 에 대한 테스트는 db 연결하여 정상적으로 데이터를 불러오는지 확인합니다.
 */
describe('PostRepository test', () => {
  let app: INestApplication;
  let postRepository: PostRepository;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, PostModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    postRepository = moduleFixture.get<PostRepository>(PostRepository);
    await app.init();
  }, 10000);

  it('toString test', async () => {
    expect(postRepository.toString()).toEqual('PostRepository');
  });
});
