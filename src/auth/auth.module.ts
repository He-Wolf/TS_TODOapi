import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthConfig } from './configs/auth.config';

@Module({
  imports: [
    UserModule,
    PassportModule.register(AuthConfig.PassportModule),
    JwtModule.register(AuthConfig.JwtModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [
    AuthService
  ],
})
export class AuthModule {}
