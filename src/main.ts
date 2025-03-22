import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://wabaulrich1234:8rDJwE47mAPyqswr@cluster0.r4vtq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), 
    
    BooksModule,
  ],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('BiblioTech API')
    .setDescription("Documentation de l'API du backend de BiblioTech")
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
