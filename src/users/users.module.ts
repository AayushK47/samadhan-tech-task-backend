import { Module } from '@nestjs/common';
import { UserService as UserService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserResolver } from './users.resolver';
import { JwtGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('auth'),
      inject: [ConfigService],
    }),
  ],
  providers: [UserService, UserResolver, JwtGuard],
  exports: [UserService]
})
export class UserModule {}
