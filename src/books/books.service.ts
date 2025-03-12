import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './books.schema';

@Injectable()
export class BooksService {
    constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

    // Récupérer tous les livres
    async findAll(): Promise<Book[]> {
        return this.bookModel.find().exec();
    }

    // Créer un nouveau livre
    async create(bookData: Partial<Book>): Promise<Book> {
        const newBook = new this.bookModel(bookData);
        return newBook.save();
    }

    // Récupérer un livre par ID
    async findById(id: string): Promise<Book | null> {
        return this.bookModel.findById(id).exec();
    }

    // Mettre à jour un livre
    async update(id: string, bookData: Partial<Book>): Promise<Book | null> {
        return this.bookModel.findByIdAndUpdate(id, bookData, { new: true }).exec();
    }

    // Supprimer un livre
    async delete(id: string): Promise<Book | null> {
        return this.bookModel.findByIdAndDelete(id).exec();
    }

    // Ajouter un commentaire
    async addComment(id: string, userId: string, userName: string, text: string): Promise<Book> {
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new NotFoundException(`Livre avec l'ID ${id} introuvable`);
        }

        book.comments.push({ userId, userName, text, date: new Date() });
        return book.save();
    }

    // Récupérer les commentaires d'un livre
    async getComments(bookId: string): Promise<{ userId: string; userName: string; text: string; date: Date }[]> {
        const book = await this.bookModel.findById(bookId).exec();
        if (!book) {
            throw new NotFoundException(`Livre avec l'ID ${bookId} introuvable`);
        }
        return book.comments;
    }

    // Ajouter un "J'aime" 👍 ou retirer un "J'aime"
    async likeBook(bookId: string, userId: string): Promise<Book> {
        const book = await this.bookModel.findById(bookId);
        if (!book) {
            throw new NotFoundException(`Livre avec l'ID ${bookId} introuvable`);
        }

        // Vérifier si l'utilisateur a déjà liké
        const index = book.likedBy.indexOf(userId);
        if (index === -1) {
            book.likedBy.push(userId);
            book.likes += 1;
        } else {
            book.likedBy.splice(index, 1);
            book.likes -= 1;
        }

        return book.save();
    }

    // Ajouter ou retirer un livre des favoris
    async toggleFavorite(bookId: string, userId: string): Promise<Book> {
        const book = await this.bookModel.findById(bookId);
        if (!book) {
            throw new NotFoundException(`Livre avec l'ID ${bookId} introuvable`);
        }

        const index = book.favoritedBy.indexOf(userId);
        if (index === -1) {
            book.favoritedBy.push(userId);
        } else {
            book.favoritedBy.splice(index, 1);
        }

        return book.save();
    }

    // Ajouter une note à un livre
    async rateBook(bookId: string, userId: string, rating: number): Promise<Book> {
        if (rating < 1 || rating > 5) {
            throw new BadRequestException('La note doit être entre 1 et 5');
        }

        const book = await this.bookModel.findById(bookId);
        if (!book) {
            throw new NotFoundException(`Livre avec l'ID ${bookId} introuvable`);
        }

        // Vérifier si l'utilisateur a déjà noté ce livre
        const existingRating = book.ratings.find(r => r.userId === userId);
        if (existingRating) {
            existingRating.rating = rating;
        } else {
            book.ratings.push({ userId, rating });
        }

        // Calcul de la nouvelle moyenne des notes
        const totalRatings = book.ratings.length;
        const sumRatings = book.ratings.reduce((sum, r) => sum + r.rating, 0);
        book.rating = parseFloat((sumRatings / totalRatings).toFixed(1));

        return book.save();
    }
}
