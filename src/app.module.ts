import { Module } from '@nestjs/common';
import mysqlConnectionConfig from "../ormconfig";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
// import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(mysqlConnectionConfig), UsersModule,
     //RolesModule, 
     AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
