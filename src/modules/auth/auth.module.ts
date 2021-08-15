import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository,]),
    PassportModule,
    JwtModule.register({
      secret: "S3cr3t",
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService,UsersService],
  controllers: [AuthController]
})
export class AuthModule {}
