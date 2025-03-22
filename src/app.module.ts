import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://wabaulrich1234:8rDJwE47mAPyqswr@cluster0.r4vtq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    BooksModule,
  ],
})
export class AppModule {}
