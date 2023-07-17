import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Country} from "@app/common";
import {Film} from "@app/common";


@Table({tableName: "film_countries"})
export class FilmCountries extends Model<FilmCountries> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Film)
    @Column({type: DataType.INTEGER})
    filmId: number

    @ForeignKey(() => Country)
    @Column({type: DataType.INTEGER})
    countryId: number
}