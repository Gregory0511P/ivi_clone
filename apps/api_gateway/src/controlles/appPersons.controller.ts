import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiTags} from "@nestjs/swagger";
import {
    PersonCreateDto,
    ProfessionCreateDto,
    PersonUpdateDto, ProfessionUpdateDto
} from "@app/common";


@ApiTags("Личности, участвующие в производстве фильмов")
@Controller()
export class AppPersonsController {
    constructor(@Inject('PERSON') private readonly personClient: ClientProxy) {
    }


    @Post("/persons")
    async createPerson(@Body() createPersonDto: PersonCreateDto) {
        return this.personClient.send(
            {
                cmd: "create-person",
            }, {
                createPersonDto,
            },
        );
    }


    @Get("/persons")
    async getAllPersons(@Query() query) {
        return this.personClient.send(
            {
                cmd: "get-all-persons",
            }, {
                query
            },
        );
    }


    @Get("/person/:id")
    async getPerson(@Param("id") id: any) {
        return this.personClient.send(
            {
                cmd: "get-person-by-id"
            }, {
                id
            }
        )
    }


    @Get("/persons/search")
    async searchPersons(@Query() query) {
        return this.personClient.send(
            {
                cmd: "search-persons"
            }, {
                query
            }
        )
    }


    @Put("/person/:id")
    async editPerson(@Body() updatePersonDto: PersonUpdateDto,
                     @Param("id") id: any) {
        return this.personClient.send(
            {
                cmd: "edit-person"
            }, {
                updatePersonDto,
                id
            }
        )
    }


    @Get("/person/:id/films")
    async getPersonsFilms(@Param("id") id: any) {
        return this.personClient.send(
            {
                cmd: "get-all-persons-films"
            }, {
                id
            }
        )
    }


    @Get("/person/:id/professions")
    async getPersonsProfessions(@Param("id") id: any) {
        return this.personClient.send(
            {
                cmd: "get-all-persons-professions"
            }, {
                id
            }
        )
    }


    @Get("/person/:id/films/:professionId")
    async getPersonsFilmsByProfession(@Param("id") id: any,
                                      @Param("professionId") professionId: any) {
        return this.personClient.send(
            {
                cmd: "get-all-persons-films-by-profession"
            }, {
                id,
                professionId
            }
        )
    }


    @Delete("/person/:id")
    async deletePerson(@Param('id') id: any) {
        return this.personClient.send(
            {
                cmd: "delete-person"
            }, {
                id
            }
        )
    }


    @Post("/professions")
    async createProfession(@Body() createProfessionDto: ProfessionCreateDto) {
        return this.personClient.send(
            {
                cmd: "create-profession",
            }, {
                createProfessionDto
            },
        );
    }


    @Get("/professions")
    async getAllProfessions() {
        return this.personClient.send(
            {
                cmd: "get-all-professions",
            }, {},
        );
    }


    @Get("/professions/:id")
    async getProfession(@Param("id") id: any, @Req() req) {
        return this.personClient.send(
            {
                cmd: "get-profession"
            }, {
                id
            }
        )
    }


    @Put("/professions/:id")
    async editProfession(@Body() updateProfessionDto: ProfessionUpdateDto,
                         @Param("id") id: any) {
        return this.personClient.send(
            {
                cmd: "edit-profession"
            }, {
                updateProfessionDto,
                id
            }
        )
    }


    @Delete("/professions/:id")
    async deleteProfession(@Param("id") id: any) {
        return this.personClient.send(
            {
                cmd: "delete-profession"
            }, {
                id
            }
        )
    }


    @Post("/person/:id/add/profession")
    async addProfessionForPerson(@Body() createProfessionDto: ProfessionCreateDto,
                                 @Param("id") id: any) {
        return this.personClient.send(
            {
                cmd: "add-profession-for-person"
            }, {
                id,
                createProfessionDto
            },
        );
    }
}