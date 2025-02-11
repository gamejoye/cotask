import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  documentDescription,
  documentTag,
  documentVersion,
  swaggerTitle,
} from '@cotask-be/common/constans/swagger';
import { ResTransformInterceptor } from '@cotask-be/common/interceptors';
import { HttpExceptionFilter } from '@cotask-be/common/filters';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle(swaggerTitle)
    .setDescription(documentDescription)
    .setVersion(documentVersion)
    .addTag(documentTag)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 只允许声明的属性
    })
  );
  app.useGlobalInterceptors(new ResTransformInterceptor());

  await app.listen(8080);
}
bootstrap();
