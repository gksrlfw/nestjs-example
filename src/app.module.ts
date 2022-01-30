import { Module } from '@nestjs/common';
import { UserModule } from '@src/modules/user/user.module';
import { CoreModule } from '@src/core/core.module';
import { PostModule } from '@src/modules/post/post.module';

@Module({
  imports: [CoreModule, UserModule, PostModule],
})
export class AppModule {}
