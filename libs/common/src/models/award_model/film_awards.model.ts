import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Award} from "@app/common";
import {Nomination} from "@app/common";
import {Film} from "@app/common";


@Table({tableName: "film_awards"})
export class FilmAwards extends Model<FilmAwards> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Award)
    @Column({type: DataType.INTEGER})
    awardId: number

    @ForeignKey(() => Nomination)
    @Column({type: DataType.INTEGER})
    nominationId: number

    @ForeignKey(() => Film)
    @Column({type: DataType.INTEGER})
    filmId: number
}