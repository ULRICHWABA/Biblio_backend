    import { 
        Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, ParseIntPipe 
    } from '@nestjs/common';
    import { BooksService } from './books.service';
    import { Book } from './books.schema';
    
    @Controller('books')
    export class BooksController {
        constructor(private readonly booksService: BooksService) {}
    
        //  Récupérer tous les livres
        @Get()
        async findAll(): Promise<Book[]> {
        return this.booksService.findAll();
        }
    
        //  Récupérer un livre par ID
        @Get(':id')
        async findOne(@Param('id') id: string): Promise<Book> {
        const book = await this.booksService.findById(id);
        if (!book) {
            throw new NotFoundException(`Livre avec l'ID ${id} introuvable`);
        }
        return book;
        }
    
        // Ajouter un nouveau livre
        @Post()
        async create(@Body() bookData: Partial<Book>): Promise<Book> {
        return this.booksService.create(bookData);
        }
    
        // Mettre à jour un livre
        @Put(':id')
        async update(@Param('id') id: string, @Body() bookData: Partial<Book>): Promise<Book> {
        const updatedBook = await this.booksService.update(id, bookData);
        if (!updatedBook) {
            throw new NotFoundException(`Livre avec l'ID ${id} introuvable`);
        }
        return updatedBook;
        }
    
        // Supprimer un livre
        @Delete(':id')
        async delete(@Param('id') id: string): Promise<Book> {
        const deletedBook = await this.booksService.delete(id);
        if (!deletedBook) {
            throw new NotFoundException(`Livre avec l'ID ${id} introuvable`);
        }
        return deletedBook;
        }
    
        // Ajouter un commentaire
        @Post(':id/comment')
        async addComment(
        @Param('id') id: string,
        @Body('userId') userId: string,
        @Body('userName') userName: string,
        @Body('text') text: string
        ): Promise<Book> {
        return this.booksService.addComment(id, userId, userName, text);
        }
    
        //  Ajouter un "J'aime" 👍
        @Post(':id/like')
        async likeBook(@Param('id') id: string): Promise<Book> {
        return this.booksService.likeBook(id);
        }
    
        //  Ajouter ou retirer un livre des favoris
        @Post(':id/favorite')
        async toggleFavorite(
        @Param('id') id: string,
        @Body('userId') userId: string
        ): Promise<Book> {
        return this.booksService.toggleFavorite(id, userId);
        }
    
        // Ajouter une note à un livre
        @Post(':id/rate')
        async rateBook(
        @Param('id') id: string,
        @Body('userId') userId: string,
        @Body('rating', ParseIntPipe) rating: number
        ): Promise<Book> {
        return this.booksService.rateBook(id, userId, rating);
        }
    }
    