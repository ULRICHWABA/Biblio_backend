import { 
    Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, 
    UsePipes, ValidationPipe 
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './books.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { RateBookDto } from './dto/rate-book.dto';
import { ToggleFavoriteDto } from './dto/toggle-favorite.dto';
import { LikeBookDto } from './dto/like-book.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    // 📌 1️⃣ Ajouter un livre avec validation
    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async create(@Body() bookData: CreateBookDto): Promise<Book> {
        return this.booksService.create(bookData);
    }

    // 📌 2️⃣ Récupérer tous les livres
    @Get()
    async findAll(): Promise<Book[]> {
        return this.booksService.findAll();
    }

    // 📌 3️⃣ Récupérer un livre par ID
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Book> {
        const book = await this.booksService.findById(id);
        if (!book) {
            throw new NotFoundException(`Livre avec l'ID ${id} introuvable`);
        }
        return book;
    }

    // 📌 4️⃣ Mettre à jour un livre
    @Put(':id')
    async update(@Param('id') id: string, @Body() bookData: Partial<Book>): Promise<Book> {
        const updatedBook = await this.booksService.update(id, bookData);
        if (!updatedBook) {
            throw new NotFoundException(`Livre avec l'ID ${id} introuvable`);
        }
        return updatedBook;
    }

    // 📌 5️⃣ Supprimer un livre
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Book> {
        const deletedBook = await this.booksService.delete(id);
        if (!deletedBook) {
            throw new NotFoundException(`Livre avec l'ID ${id} introuvable`);
        }
        return deletedBook;
    }

    // 📌 6️⃣ Ajouter un commentaire avec validation
    @Post(':id/comment')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async addComment(@Param('id') id: string, @Body() commentData: AddCommentDto): Promise<Book> {
        return this.booksService.addComment(id, commentData.userId, commentData.userName, commentData.text);
    }

    // 📌 7️⃣ Récupérer tous les commentaires d'un livre
    @Get(':id/comments')
    async getComments(@Param('id') id: string): Promise<{ userId: string; userName: string; text: string; date: Date }[]> {
        return this.booksService.getComments(id);
    }

    // 📌 8️⃣ Ajouter ou retirer un "J'aime" 👍 avec validation
    @Post(':id/like')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async likeBook(@Param('id') id: string, @Body() likeData: LikeBookDto): Promise<Book> {
        return this.booksService.likeBook(id, likeData.userId);
    }

    // 📌 9️⃣ Ajouter ou retirer un livre des favoris avec validation
    @Post(':id/favorite')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async toggleFavorite(@Param('id') id: string, @Body() favoriteData: ToggleFavoriteDto): Promise<Book> {
        return this.booksService.toggleFavorite(id, favoriteData.userId);
    }

    // 📌 🔟 Ajouter une note à un livre avec validation
    @Post(':id/rate')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async rateBook(@Param('id') id: string, @Body() rateData: RateBookDto): Promise<Book> {
        return this.booksService.rateBook(id, rateData.userId, rateData.rating);
    }
}
