import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "@app/common";
import {Genre} from "@app/common";


@Table({tableName: "film_genres"})
export class FilmGenres extends Model<FilmGenres> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Film)
    @Column({type: DataType.INTEGER})
    filmId: number

    @ForeignKey(() => Genre)
    @Column({type: DataType.INTEGER})
    genreId: number
}