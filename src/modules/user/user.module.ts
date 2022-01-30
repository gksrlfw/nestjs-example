import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from '@src/modules/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@src/modules/user/repositories/user.repository';
import { PostModule } from '@src/modules/post/post.module';
import { UserPostsLoader } from '@src/modules/user/loaders/user-posts.loader';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), PostModule],
  providers: [UserResolver, UserService, UserPostsLoader],
  exports: [UserService],
})
export class UserModule {}
