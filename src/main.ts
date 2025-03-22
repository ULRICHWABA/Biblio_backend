import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Appliquer la validation globale
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('BiblioTech API')
    .setDescription("Documentation de l'API du backend de BiblioTech")
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Démarrer l'application sur le port 3000
  await app.listen(3000);
}

bootstrap();
