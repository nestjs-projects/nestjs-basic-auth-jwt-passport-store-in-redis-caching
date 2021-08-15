import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UsersModule } from './modules/users/users.module';
import * as cookieParser from 'cookie-parser';
const bodyParser = require('body-parser');



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.useGlobalPipes(new ValidationPipe());// global validation
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    credentials:true,
    origin:"http://localhost:8080"
  });
  const config = new DocumentBuilder()
    .setTitle('DAO LASSINA API')
    .setDescription('DL description')
    .setVersion('1.0')
    //.addTag('test')
    .build();
  const document = SwaggerModule.createDocument(app, config,
    //{ include:[UsersModule]}
    );
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
