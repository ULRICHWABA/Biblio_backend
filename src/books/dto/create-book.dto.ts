import { IsNotEmpty, IsString, IsNumber, Min, Max, MaxLength } from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty({ message: 'Le titre est requis' })
    @IsString({ message: 'Le titre doit être une chaîne de caractères' })
    @MaxLength(100, { message: 'Le titre ne peut pas dépasser 100 caractères' })
    title: string;

    @IsNotEmpty({ message: 'L\'auteur est requis' })
    @IsString({ message: 'L\'auteur doit être une chaîne de caractères' })
    @MaxLength(50, { message: 'L\'auteur ne peut pas dépasser 50 caractères' })
    author: string;

    @IsNotEmpty({ message: 'Le genre est requis' })
    @IsString({ message: 'Le genre doit être une chaîne de caractères' })
    @MaxLength(30, { message: 'Le genre ne peut pas dépasser 30 caractères' })
    genre: string;

    @IsNotEmpty({ message: 'L\'année est requise' })
    @IsNumber({}, { message: 'L\'année doit être un nombre' })
    @Min(1800, { message: 'L\'année doit être supérieure à 1800' })
    @Max(new Date().getFullYear(), { message: 'L\'année ne peut pas être dans le futur' })
    year: number;

    @IsNotEmpty({ message: 'Le résumé est requis' })
    @IsString({ message: 'Le résumé doit être une chaîne de caractères' })
    @MaxLength(500, { message: 'Le résumé ne peut pas dépasser 500 caractères' })
    summary: string;
}
