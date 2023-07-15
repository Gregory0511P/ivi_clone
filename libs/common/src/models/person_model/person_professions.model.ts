import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Profession} from "@app/common/models/person_model/profession.model";
import {Person} from "@app/common";


@Table({tableName: "person_professions"})
export class PersonProfessions extends Model<PersonProfessions> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Person)
    @Column({type: DataType.INTEGER})
    personId: number

    @ForeignKey(() => Profession)
    @Column({type: DataType.INTEGER})
    professionId: number
}