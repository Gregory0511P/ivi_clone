import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class NominationCreateDto {
    @ApiProperty({example: "Лучший фильм", description: "Название номинации"})
    @IsString({message: "Должно быть строкой"})
    @Length(1)
    name: string;
}