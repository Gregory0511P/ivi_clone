import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "@app/common";
import {Person} from "@app/common";


@Table({tableName: "film_cinematography"})
export class FilmCinematography extends Model<FilmCinematography> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Film)
    @Column({type: DataType.INTEGER})
    filmId: number

    @ForeignKey(() => Person)
    @Column({type: DataType.INTEGER})
    personId: number
}