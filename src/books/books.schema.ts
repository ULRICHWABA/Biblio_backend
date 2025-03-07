        import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
        import { Document } from 'mongoose';

        export type BookDocument = Book & Document;

        @Schema({ timestamps: true })
        export class Book {
        @Prop({ required: true })
        title: string;

        @Prop({ required: true })
        author: string;

        @Prop()
        genre: string;

        @Prop()
        year: number;

        @Prop()
        summary: string;

        @Prop({ default: 0 })
        rating: number;

        @Prop({ default: 0 })
        likes: number; // Ajout du compteur de "J'aime"


        @Prop({ default: [] })
        favoritedBy: string[]; // ✅ Liste des utilisateurs qui ont ajouté ce livre en favori

        @Prop({ default: [] })
    ratings: { userId: string; rating: number }[]; // ✅ Notes des utilisateurs

    @Prop({ default: [] })
    comments: { userId: string; userName: string; text: string; date: Date }[]; // ✅ Commentaires
        }

        export const BookSchema = SchemaFactory.createForClass(Book);
