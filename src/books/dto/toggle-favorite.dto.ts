import { IsNotEmpty, IsString } from 'class-validator';

export class ToggleFavoriteDto {
    @IsNotEmpty({ message: 'L\'identifiant utilisateur est requis' })
    @IsString({ message: 'L\'identifiant utilisateur doit être une chaîne de caractères' })
    userId: string;
}
