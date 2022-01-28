import { Module } from '@nestjs/common';
import { UserModule } from '@src/modules/user/user.module';
import { CoreModule } from '@src/core/core.module';

@Module({
  imports: [CoreModule, UserModule],
})
export class AppModule {}
