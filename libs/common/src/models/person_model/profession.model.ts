import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Person} from "@app/common";
import {PersonProfessions} from "@app/common";
import {ApiProperty} from "@nestjs/swagger";


interface ProfessionCreationAttrs {
    name: string,
}

@Table({tableName: "professions"})
export class Profession extends Model<Profession, ProfessionCreationAttrs> {
    @ApiProperty({example: 1, description: "Уникальный идентификатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Режиссер", description: "Название профессии"})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name: string

    @ApiProperty({example: [{}], description: "Список персон профессии"})
    @BelongsToMany(() => Person, () => PersonProfessions)
    persons: Person[];
}