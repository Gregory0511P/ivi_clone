import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {FilmDirectors} from "@app/common/models/film_model/film_directors.model";
import {Person} from "@app/common/models/person_model/person.model";
import {FilmActors} from "@app/common/models/film_model/film_actors.model";
import {FilmWriters} from "@app/common/models/film_model/film_writers.model";
import {FilmProducers} from "@app/common/models/film_model/film_producers.model";
import {FilmCinematography} from "@app/common/models/film_model/film_cinematography.model";
import {FilmMusicians} from "@app/common/models/film_model/film_musicians.model";
import {FilmDesigners} from "@app/common/models/film_model/film_designers.model";
import {FilmEditors} from "@app/common/models/film_model/film_editors.model";
import {Genre} from "@app/common/models/genre_model/genre.model";
import {FilmGenres} from "@app/common/models/genre_model/film_genres.model";
import {Award} from "@app/common/models/award_model/award.model";
import {FilmAwards} from "@app/common/models/award_model/film_awards.model";
import {Review} from "@app/common/models/review_model/rerview.model";
import {Country} from "@app/common/models/country_model/country.model";
import {FilmCountries} from "@app/common/models/country_model/film_country.model";
import {RelatedFilms} from "@app/common/models/film_model/related_films.model";
import {ApiProperty} from "@nestjs/swagger";


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
    @ApiProperty({example: 1, description: "Уникальный идентификатор фильма"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Начало", description: "Название фильма"})
    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @ApiProperty({example: "Inception", description: "Название фильма на оригинальном языке"})
    @Column({type: DataType.STRING, allowNull: false})
    originalName: string

    @ApiProperty({example: "http://example.com/poster", description: "Ссылка на постер"})
    @Column({type: DataType.STRING})
    poster: string

    @ApiProperty({example: "http://example.com/trailer", description: "Ссылка на трейлер"})
    @Column({type: DataType.STRING})
    trailer: string

    @ApiProperty({example: "18+", description: "Возрастной рейтинг"})
    @Column({type: DataType.STRING})
    mpaaRating: string

    @ApiProperty({example: 9.0, description: "Оценка фильма на кинопоиске"})
    @Column({type: DataType.DECIMAL(2, 1)})
    rating: number

    @ApiProperty({example: 1000000, description: "Количество оценок фильма на кинопоиске"})
    @Column({type: DataType.INTEGER, defaultValue: 0})
    ratingsNumber: number

    @ApiProperty({example: 2010, description: "Год выхода фильма"})
    @Column({type: DataType.INTEGER, allowNull: false})
    year: number

    @ApiProperty({example: 120, description: "Продолжительность фильма в минутах или количество сезонов для сериалов"})
    @Column({type: DataType.INTEGER})
    duration: number

    @ApiProperty({example: "Фильма начало", description: "Описание фильма"})
    @Column({type: DataType.TEXT})
    description: string

    @ApiProperty({example: [{}], description: "Список режиссеров фильма"})
    @BelongsToMany(() => Person, () => FilmDirectors)
    directors: Person[];

    @ApiProperty({example: [{}], description: "Список актеров фильма"})
    @BelongsToMany(() => Person, () => FilmActors)
    actors: Person[];

    @ApiProperty({example: [{}], description: "Список сценаристов фильма"})
    @BelongsToMany(() => Person, () => FilmWriters)
    writers: Person[];

    @ApiProperty({example: [{}], description: "Список продюсеров фильма"})
    @BelongsToMany(() => Person, () => FilmProducers)
    producers: Person[];

    @ApiProperty({example: [{}], description: "Список операторов фильма"})
    @BelongsToMany(() => Person, () => FilmCinematography)
    cinematography: Person[];

    @ApiProperty({example: [{}], description: "Список композиторов фильма"})
    @BelongsToMany(() => Person, () => FilmMusicians)
    musicians: Person[];

    @ApiProperty({example: [{}], description: "Список художников фильма"})
    @BelongsToMany(() => Person, () => FilmDesigners)
    designers: Person[];

    @ApiProperty({example: [{}], description: "Список монтажеров фильма"})
    @BelongsToMany(() => Person, () => FilmEditors)
    editors: Person[];

    @ApiProperty({example: [{}], description: "Список жанров"})
    @BelongsToMany(() => Genre, () => FilmGenres)
    genres: Genre[];

    @ApiProperty({example: [{}], description: "Список наград фильма"})
    @BelongsToMany(() => Award, () => FilmAwards)
    awards: Award[];

    @ApiProperty({example: [{}], description: "Список стран фильма"})
    @BelongsToMany(() => Country, () => FilmCountries)
    countries: Award[];

    @ApiProperty({example: [{}], description: "Список комментариев к фильму"})
    @HasMany(() => Review)
    reviews: Review[];

    @ApiProperty({example: [{}], description: "Список связанных фильмов"})
    @BelongsToMany(() => Film, () => RelatedFilms, 'filmId', 'relatedFilmId')
    relatedFilms;
}