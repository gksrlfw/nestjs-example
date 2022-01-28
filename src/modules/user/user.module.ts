import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from '@src/modules/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@src/modules/user/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
