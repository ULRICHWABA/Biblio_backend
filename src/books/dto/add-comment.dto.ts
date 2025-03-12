import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class AddCommentDto {
    @IsNotEmpty({ message: 'L\'identifiant utilisateur est requis' })
    @IsString({ message: 'L\'identifiant utilisateur doit être une chaîne de caractères' })
    userId: string;

    @IsNotEmpty({ message: 'Le nom d\'utilisateur est requis' })
    @IsString({ message: 'Le nom d\'utilisateur doit être une chaîne de caractères' })
    @MinLength(2, { message: 'Le nom d\'utilisateur doit avoir au moins 2 caractères' })
    @MaxLength(50, { message: 'Le nom d\'utilisateur ne peut pas dépasser 50 caractères' })
    userName: string;

    @IsNotEmpty({ message: 'Le commentaire ne peut pas être vide' })
    @IsString({ message: 'Le commentaire doit être une chaîne de caractères' })
    @MinLength(3, { message: 'Le commentaire doit contenir au moins 3 caractères' })
    @MaxLength(500, { message: 'Le commentaire ne peut pas dépasser 500 caractères' })
    text: string;
}
