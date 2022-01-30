import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CoreModule } from '@src/core/core.module';
import { PostModule } from '@src/modules/post/post.module';
import { PostService } from '@src/modules/post/post.service';

describe('UserMasterRepository test', () => {
  let app: INestApplication;
  let postService: PostService;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, PostModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    postService = moduleFixture.get<PostService>(PostService);
    await app.init();
  }, 10000);

  it('', async () => {
    console.log(await postService.getPostById(1));
    console.log(await postService.getPostById(2));
    console.log(await postService.getPostById(3));
  });
});
