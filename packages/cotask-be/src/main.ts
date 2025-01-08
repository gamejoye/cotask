import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerTitle = 'Cotask Backend Api';
const documentDescription = 'Cotask: 一款面向团队的协同待办事项工具';
const documentVersion = 'v0.0.0';
const documentTag = 'Api/V1';

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
  await app.listen(8080);
}
bootstrap();
