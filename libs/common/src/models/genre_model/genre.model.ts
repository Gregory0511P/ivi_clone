import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Film} from "@app/common";
import {FilmGenres} from "@app/common";
import {ApiProperty} from "@nestjs/swagger";


interface GenreCreationAttrs {
    name: string,
    englishName: string,
}

@Table({tableName: "genres"})
export class Genre extends Model<Genre, GenreCreationAttrs> {
    @ApiProperty({example: 1, description: "Уникальный идентификатор жанра"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Драма", description: "Название жанра"})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name: string

    @ApiProperty({example: "drama", description: "Название жанра на английском языке"})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    englishName: string

    @ApiProperty({example: [{}], description: "Список фильмов в жанре"})
    @BelongsToMany(() => Film, () => FilmGenres)
    films: Film[];
}