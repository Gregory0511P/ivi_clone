import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {AppService} from "../app.service";
import {ApiTags} from "@nestjs/swagger";

import {
    AwardAddDto,
    PersonAddDto,
    RelatedFilmAddDto,
    FilmCreateDto,
    FilmUpdateDto,
} from "@app/common";


@ApiTags("Фильмы")
@Controller()
export class AppFilmsController {
    constructor(@Inject('FILM') private readonly filmClient: ClientProxy,
                private appService: AppService) {}


    @Post("/films")
    async createFilm(@Body() createFilmDto: FilmCreateDto) {
        return this.filmClient.send(
            {
                cmd: "create-film",
            }, {
                createFilmDto,
            },
        );
    }


    @Get("/films")
    async getAllFilms(@Query() query) {
        return this.filmClient.send(
            {
                cmd: "get-all-films",
            }, {
                query
            },
        );
    }


    @Get("/films/filter/:filter1")
    async filterFilmWithOneFilter(@Param("filter1") filter1: any,
                                  @Query() query) {
        let filterObject = {
            genres: null,
            year: null,
            countries: null
        }

        this.appService.addFiltersToFilterObject(filterObject, filter1);

        return this.filmClient.send(
            {
                cmd: "filter-films",
            }, {
                filterObject,
                query
            },
        );
    }


    @Get("/films/filter/:filter1/:filter2")
    async filterFilmWithTwoFilters(@Param("filter1") filter1: any,
                                   @Param("filter2") filter2: any,
                                   @Query() query) {
        let filterObject = {
            genres: null,
            year: null,
            countries: null
        }

        this.appService.addFiltersToFilterObject(filterObject, filter1);
        this.appService.addFiltersToFilterObject(filterObject, filter2);

        return this.filmClient.send(
            {
                cmd: "filter-films",
            }, {
                filterObject,
                query
            },
        );
    }


    @Get("/films/filter/:filter1/:filter2/:filter3")
    async filterFilmWithThreeFilters(@Param("filter1") filter1: any,
                                     @Param("filter2") filter2: any,
                                     @Param("filter3") filter3: any,
                                     @Query() query) {
        let filterObject = {
            genres: null,
            year: null,
            countries: null
        }

        this.appService.addFiltersToFilterObject(filterObject, filter1);
        this.appService.addFiltersToFilterObject(filterObject, filter2);
        this.appService.addFiltersToFilterObject(filterObject, filter3);

        return this.filmClient.send(
            {
                cmd: "filter-films",
            }, {
                filterObject,
                query
            },
        );
    }


    @Get("/films/:id")
    async getFilm(@Param("id") id: any) {
        return this.filmClient.send(
            {
                cmd: "get-film",
            }, {
                id
            },
        );
    }


    @Get("/films/name/:name")
    async getFilmsByName(@Param("name") name: any) {
        return this.filmClient.send(
            {
                cmd: "get-films-by-name",
            },
            {
                name
            },
        );
    }


    @Put("/films/:id")
    async editFilm(@Body() updateFilmDto: FilmUpdateDto,
                   @Param("id") id: any) {
        return this.filmClient.send(
            {
                cmd: "edit-film",
            }, {
                updateFilmDto,
                id
            },
        );
    }


    @Delete("/films/:id")
    async deleteFilm(@Param("id") id: any) {
        return this.filmClient.send(
            {
                cmd: "delete-film",
            }, {
                id
            },
        );
    }


    @Post("/films/:id/add/director")
    async addDirector(@Body() addPersonDto: PersonAddDto,
                      @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-director"
        }, {
            id,
            addPersonDto
        })
    }


    @Post("/films/:id/add/actor")
    async addActor(@Body() addPersonDto: PersonAddDto,
                   @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-actor"
        }, {
            id,
            addPersonDto
        })
    }


    @Post("/films/:id/add/writer")
    async addWriter(@Body() addPersonDto: PersonAddDto,
                    @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-writer"
        }, {
            id,
            addPersonDto
        })
    }


    @Post("/films/:id/add/producer")
    async addProducer(@Body() addPersonDto: PersonAddDto,
                      @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-producer"
        }, {
            id,
            addPersonDto
        })
    }


    @Post("/films/:id/add/cinematography")
    async addCinematography(@Body() addPersonDto: PersonAddDto,
                            @Param('id') id: any) {
        return this.filmClient.send({
            cmd: "add-cinematography"
        }, {
            id,
            addPersonDto
        })
    }


    @Post("/films/:id/add/musician")
    async addMusician(@Body() addPersonDto: PersonAddDto,
                      @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-musician"
        }, {
            id,
            addPersonDto
        })
    }


    @Post("/films/:id/add/designer")
    async addDesigner(@Body() addPersonDto: PersonAddDto,
                      @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-designer"
        }, {
            id,
            addPersonDto
        })
    }


    @Post("/films/:id/add/editor")
    async addEditor(@Body() addPersonDto: PersonAddDto,
                    @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-editor"
        }, {
            id,
            addPersonDto
        })
    }


    @Post("/films/:id/add/genre")
    async addGenre(@Body() addGenreDto: PersonAddDto,
                   @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-genre"
        }, {
            id,
            addGenreDto
        })
    }


    @Post("/films/:id/add/country")
    async addCountry(@Body() addCountryDto: PersonAddDto,
                     @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-country"
        }, {
            id,
            addCountryDto
        })
    }


    @Post("/films/:id/add/award")
    async addAward(@Body() addAwardDto: AwardAddDto,
                   @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-award"
        }, {
            id,
            addAwardDto
        })
    }


    @Post("/films/:id/add/relatedFilm")
    async addRelatedFilm(@Body() addRelatedFilmDto: RelatedFilmAddDto,
                         @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-related-film"
        }, {
            id,
            addRelatedFilmDto
        })
    }


    @Get("/films/:id/persons")
    async getAllPersonsByFilm(@Param("id") id: any) {
        return this.filmClient.send({
            cmd: "get-all-persons"
        }, {
            id,
        })
    }
}