import {Inject, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {genresMap} from "@app/common/maps/maps";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";
import {Op} from "sequelize";
import {
    Profession,
    Film,
    FilmCreateDto,
    Country,
    Person,
    Genre,
    Review,
    Award,
    FilmUpdateDto
} from "@app/common";


@Injectable()
export class FilmService {
    INCLUDE_ARRAY = [
        {
            model: Person,
            as: "directors",
            attributes: ["id", "name", "originalName", "photo"],
            through: {attributes: []}
        },
        {model: Person, as: "writers", attributes: ["id", "name", "originalName", "photo"], through: {attributes: []}},
        {
            model: Person,
            as: "producers",
            attributes: ["id", "name", "originalName", "photo"],
            through: {attributes: []}
        },
        {
            model: Person,
            as: "cinematography",
            attributes: ["id", "name", "originalName", "photo"],
            through: {attributes: []}
        },
        {
            model: Person,
            as: "musicians",
            attributes: ["id", "name", "originalName", "photo"],
            through: {attributes: []}
        },
        {
            model: Person,
            as: "designers",
            attributes: ["id", "name", "originalName", "photo"],
            through: {attributes: []}
        },
        {model: Person, as: "editors", attributes: ["id", "name", "originalName", "photo"], through: {attributes: []}},
        {model: Person, as: "actors", attributes: ["id", "name", "originalName", "photo"], through: {attributes: []}},
        {model: Country, attributes: ["id", "name", "englishName"], through: {attributes: []}},
        {model: Genre, attributes: ["id", "name", "englishName"], through: {attributes: []}},
        {model: Film, attributes: ["id", "name", "originalName"], through: {attributes: []}},
        {model: Award, through: {attributes: []}},
        {model: Review}
    ]

    constructor(@InjectModel(Film) private filmRepository: typeof Film,
                @Inject('PERSON') private readonly personClient: ClientProxy,
                @Inject('GENRE') private readonly genreClient: ClientProxy,
                @Inject('AWARD') private readonly awardClient: ClientProxy,
                @Inject('COUNTRY') private readonly countryClient: ClientProxy) {
    }

    async createFilm(dto: FilmCreateDto, directors?, actors?, writers?, producers?, cinematography?, musicians?, designers?,
                     editors?, genres?, countries?, awards?, relatedFilms?) {
        let exists = await this.checkIfExists(dto);

        if (!exists) {
            const film = await this.filmRepository.create(dto);
            await film.$set("genres", []);
            await film.$set("awards", []);
            await film.$set("countries", []);
            await film.$set("relatedFilms", []);
            await film.$set("reviews", []);

            await this.addDirectorsForFilm(film, directors);
            await this.addActorsForFilm(film, actors);
            await this.addWritersForFilm(film, writers);
            await this.addProducersForFilm(film, producers);
            await this.addDesignersForFilm(film, designers);
            await this.addCinematographyForFilm(film, cinematography);
            await this.addMusiciansForFilm(film, musicians);
            await this.addEditorsForFilm(film, editors);
            await this.addGenresForFilm(film, genres);
            await this.addCountriesForFilm(film, countries);
            await this.addAwardsForFilm(film, awards);
            await this.addRelatedFilmsForFilm(film, relatedFilms);

            return film;
        }

        return null;
    }

    async getAllFilms(query?) {
        let films;

        if (query.db_limit) {
            films = await this.filmRepository.findAll({
                limit: query.db_limit
            });
        } else {
            films = await this.filmRepository.findAll();
        }

        if (query) {
            films = await this.handleQuery(films, query)
        }

        return films;
    }

    async getFilmById(id: number) {
        return await this.filmRepository.findByPk(id, {
            include: this.INCLUDE_ARRAY
        });
    }

    async getFilmByName(name) {
        return await this.filmRepository.findOne({
            where: {
                name
            },
            include: this.INCLUDE_ARRAY
        });
    }

    async getFilmsByName(name) {
        return await this.filmRepository.findAll({
            where: {
                [Op.or]: {
                    name: {
                        [Op.iLike]: `${name}%`
                    },
                    originalName: {
                        [Op.iLike]: `${name}%`
                    }
                }
            },
        });

    }

    async getFilmByNameAndOriginalName(name, originalName) {
        return await this.filmRepository.findOne({
            where: {
                name,
                originalName
            },
            include: this.INCLUDE_ARRAY
        });
    }

    async filterFilms(genreFilter, yearFilter, countriesFilter, query) {
        let films: Film[] = await this.getAllFilms(query);

        if (genreFilter) {
            films = await this.filterFilmsByGenres(films, genreFilter);
        }
        if (yearFilter) {
            if (yearFilter.includes("-")) {
                films = this.filterFilmsByYearInterval(films, yearFilter);
            } else {
                films = this.filterFilmsBySingleYear(films, yearFilter)
            }
        }
        if (countriesFilter) {
            films = await this.filterFilmsByCountries(films, countriesFilter);
        }

        return films;

    }

    async filterFilmsByCountries(films, countries) {
        let filmsIds = await lastValueFrom(this.countryClient.send({
                    cmd: "get-films-ids-by-countries",
                },
                {
                    countries
                })
        );
        return films.filter(film => filmsIds.includes(film.id))
    }

    async filterFilmsByGenres(films: Film[], genres) {
        let filmsIds = await lastValueFrom(this.genreClient.send({
                    cmd: "get-films-ids-by-genres"
                },
                {
                    genres
                })
        );
        return films.filter(film => filmsIds.includes(film.id))
    }

    filterFilmsBySingleYear(films, year: number) {
        return films.filter(film => year == 1980 ? film.year < year : film.year == year);
    }

    filterFilmsByYearInterval(films, interval: string) {
        const [firstYear, secondYear] = interval.split("-");
        return films.filter(film => film.year >= +firstYear && film.year <= +secondYear);
    }

    filterFilmsByRating(films, query) {
        return films.filter(film => film.rating >= query.rating_gte);
    }

    filterFilmsByRatingNumber(films, query) {
        return films.filter(film => film.ratingsNumber >= query.ratingsNumber_gte);
    }

    filterFilmsByName(films, query) {
        return films.filter(film => film.name.includes(query.search_query) || film.originalName.includes(query.search_query));
    }

    async getFilmsByPersonName(name: string) {
        const person = await lastValueFrom(this.personClient.send({
            cmd: "get-person-by-name"
        }, {
            name
        }));

        if (person) {
            return await lastValueFrom(this.personClient.send({
                cmd: "get-all-persons-films"
            }, {
                id: person.id
            }))
        }
    }

    async editFilm(updateFilmDto: FilmUpdateDto, id: number) {
        await this.filmRepository.update({...updateFilmDto}, {
            where: {
                id
            }
        })

        return this.getFilmById(id);
    }

    async deleteFilm(id: number) {
        return await this.filmRepository.destroy({
            where: {
                id
            }
        })
    }

    async getAllPersons(id: number) {
        const film = await this.getFilmById(id);
        return {
            directors: film.directors,
            writers: film.writers,
            producers: film.producers,
            cinematography: film.cinematography,
            musicians: film.musicians,
            designers: film.designers,
            editors: film.editors,
            actors: film.actors,
        }
    }

    async addDirectorsForFilm(film: Film, directors) {
        if (directors) {
            const profession = await lastValueFrom(this.personClient.send({
                    cmd: "get-or-create-profession"
                }, {
                    profession: "Режиссер"
                })
            );

            await film.$set("directors", []);

            await this.addInfoForPesronAndFilm(film, directors, profession, "director");
        }
    }

    async addActorsForFilm(film: Film, actors) {
        if (actors) {
            const profession = await lastValueFrom(this.personClient.send({
                    cmd: "get-or-create-profession"
                }, {
                    profession: "Актер"
                })
            );

            await film.$set("actors", []);

            await this.addInfoForPesronAndFilm(film, actors, profession, "actor");
        }
    }

    async addWritersForFilm(film: Film, writers) {
        if (writers) {
            const profession = await lastValueFrom(this.personClient.send({
                    cmd: "get-or-create-profession"
                }, {
                    profession: "Сценарист"
                })
            );

            await film.$set("writers", []);

            await this.addInfoForPesronAndFilm(film, writers, profession, "writer");
        }
    }

    async addProducersForFilm(film: Film, producers) {
        if (producers) {
            const profession = await lastValueFrom(this.personClient.send({
                    cmd: "get-or-create-profession"
                }, {
                    profession: "Продюсер"
                })
            );

            await film.$set("producers", []);

            await this.addInfoForPesronAndFilm(film, producers, profession, "producer");
        }
    }

    async addCinematographyForFilm(film: Film, cinematography) {
        if (cinematography) {
            const profession = await lastValueFrom(this.personClient.send({
                    cmd: "get-or-create-profession"
                }, {
                    profession: "Оператор"
                })
            );

            await film.$set("cinematography", []);

            await this.addInfoForPesronAndFilm(film, cinematography, profession, "cinematography");
        }
    }

    async addMusiciansForFilm(film: Film, musicians) {
        if (musicians) {
            const profession = await lastValueFrom(this.personClient.send({
                    cmd: "get-or-create-profession"
                }, {
                    profession: "Композитор"
                })
            );

            await film.$set("musicians", []);

            await this.addInfoForPesronAndFilm(film, musicians, profession, "musician");
        }
    }

    async addDesignersForFilm(film: Film, designers) {
        if (designers) {
            const profession = await lastValueFrom(this.personClient.send({
                    cmd: "get-or-create-profession"
                }, {
                    profession: "Художник"
                })
            );

            await film.$set("designers", []);

            await this.addInfoForPesronAndFilm(film, designers, profession, "designer");
        }
    }

    async addEditorsForFilm(film: Film, editors) {
        if (editors) {
            const profession = await lastValueFrom(this.personClient.send({
                    cmd: "get-or-create-profession"
                }, {
                    profession: "Монтажер"
                })
            );

            await film.$set("editors", []);

            await this.addInfoForPesronAndFilm(film, editors, profession, "editor");
        }
    }

    async addGenresForFilm(film: Film, genres) {
        if (genres) {
            for (const genreDto of genres) {
                const genre = await lastValueFrom(this.genreClient.send({
                        cmd: "get-or-create-genre"
                    }, {
                        createGenreDto: {
                            name: genreDto.name,
                            englishName: genresMap.get(genreDto.name)
                        }
                    })
                );

                await film.$add("genre", genre.id);
            }
        }
    }

    async addCountriesForFilm(film: Film, countries) {
        if (countries) {
            for (const countryDto of countries) {
                const country = await lastValueFrom(this.countryClient.send<Country>({
                        cmd: "get-or-create-country",
                    }, {
                        createCountryDto: countryDto
                    })
                );

                await film.$add("country", country.id);
            }
        }
    }

    async addAwardsForFilm(film: Film, awards) {
        if (awards) {
            for (const awardDto of awards) {
                const award = await lastValueFrom(this.awardClient.send({
                    cmd: "get-or-create-award"
                }, {
                    createAwardDto: awardDto
                }));
                await film.$add("award", award.id);

                const nominations = awardDto.nominations

                let res = await lastValueFrom(this.awardClient.send({
                        cmd: "add-film-and-nominations-for-award"
                    }, {
                        film,
                        award,
                        nominations
                    })
                );
            }
        }
    }

    async addRelatedFilmsForFilm(film: Film, relatedFilms) {
        if (relatedFilms) {
            for (const relatedFilmObject of relatedFilms) {
                const relatedFilm = await this.getFilmByName(relatedFilmObject.name);

                if (relatedFilm && relatedFilm.originalName !== film.originalName) {
                    await film.$add("relatedFilm", relatedFilm.id);
                    await relatedFilm.$add("relatedFilm", film.id);
                }
            }
        }
    }

    async addInfoForPesronAndFilm(film: Film, persons, profession: Profession, professionName) {
        for (const personDto of persons) {
            const person = await lastValueFrom(this.personClient.send({
                        cmd: "get-or-create-person"
                    },
                    {
                        createPersonDto: personDto
                    })
            );

            let res = await lastValueFrom(this.personClient.send({
                        cmd: "add-film-for-person"
                    },
                    {
                        person,
                        film
                    })
            );

            const professions = personDto.professions;

            await this.personClient.send({
                cmd: "add-professions-for-person"
            }, {
                person,
                professions
            })

            await film.$add(professionName, person.id);

            res = await lastValueFrom(this.personClient.send({
                        cmd: "add-profession-in-film-for-person"
                    },
                    {
                        film,
                        person,
                        profession
                    })
            );
        }
    }

    async handleQuery(films, query) {
        let filteredFilms: Film[] = films;

        if (query.person) {
            filteredFilms = await this.getFilmsByPersonName(query.person);
        }
        if (query.search_query) {
            filteredFilms = this.filterFilmsByName(filteredFilms, query);
        }
        if (query.rating_gte) {
            filteredFilms = this.filterFilmsByRating(filteredFilms, query);
        }
        if (query.ratingsNumber_gte) {
            filteredFilms = this.filterFilmsByRatingNumber(filteredFilms, query);
        }
        if (query.limit) {
            filteredFilms = filteredFilms.slice(0, query.limit);
        }
        return filteredFilms;
    }

    private async checkIfExists(createFilmDto: FilmCreateDto) {
        let film = await this.filmRepository.findOne({
            where: {
                name: createFilmDto.name,
                year: createFilmDto.year,
                rating: createFilmDto.rating,
                ratingsNumber: createFilmDto.ratingsNumber
            }
        })
        return !!film;
    }
}