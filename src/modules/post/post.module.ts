import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from '@src/modules/post/repositories/post.repository';
import { PostService } from '@src/modules/post/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository])],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
