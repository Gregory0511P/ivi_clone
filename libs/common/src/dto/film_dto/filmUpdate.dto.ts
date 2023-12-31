import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class FilmUpdateDto {
    @ApiProperty({example: "Начало", description: "Название фильма"})
    @IsString({message: "Должно быть строкой"})
    @Length(1)
    name: string
}