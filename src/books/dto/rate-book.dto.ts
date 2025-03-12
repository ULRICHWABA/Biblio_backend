import { IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class RateBookDto {
    @IsNotEmpty({ message: 'L\'identifiant utilisateur est requis' })
    userId: string;

    @IsNotEmpty({ message: 'La note est requise' })
    @IsInt({ message: 'La note doit être un entier' })
    @Min(1, { message: 'La note doit être au minimum 1' })
    @Max(5, { message: 'La note doit être au maximum 5' })
    rating: number;
}
