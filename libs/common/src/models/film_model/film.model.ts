import {Model, Table} from "sequelize-typescript";


interface FilmCreationAttrs {
    name: string,
    englishName: string,
    poster: string,
    trailer: string,
    mpaaRating: string,
    rating: number,
    ratingsNumber: number,
    year: number,
    duration: number,
    description: string,
}

@Table({tableName: "films"})
export class Film extends Model<Film, FilmCreationAttrs> {
}