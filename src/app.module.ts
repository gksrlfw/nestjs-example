import { Module } from '@nestjs/common';
import { UserModule } from '@src/modules/user/user.module';
import { CoreModule } from '@src/core/core.module';
import { PostModule } from '@src/modules/post/post.module';
import { CommentModule } from '@src/modules/comment/comment.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from '@src/common/dataloader/nestjs-dataloader';

@Module({
  imports: [CoreModule, UserModule, PostModule, CommentModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class AppModule {}
