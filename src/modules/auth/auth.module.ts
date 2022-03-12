import { UserRepository } from '@src/modules/user/repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '@src/modules/auth/auth.service';
import { UserModule } from '@src/modules/user/user.module';
import { AuthResolver } from '@src/modules/auth/auth.resolver';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '60s',
      },
    }),
    UserModule,
  ],
  providers: [AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
