import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiTags} from "@nestjs/swagger";
import {GenreCreateDto, GenreUpdateDto} from "@app/common";


@ApiTags("Жанры фильмов")
@Controller()
export class AppGenresController {
    constructor(@Inject('GENRE') private readonly genreClient: ClientProxy) {
    }


    @Post("/genres")
    async createGenre(@Body() createGenreDto: GenreCreateDto) {
        return this.genreClient.send(
            {
                cmd: "create-genre",
            }, {
                createGenreDto
            },
        );
    }


    async getAllGenres() {
        return this.genreClient.send(
            {
                cmd: "get-all-genres",
            }, {},
        );
    }


    @Get("/genres/:id")
    async getGenre(@Param("id") id: any) {
        return this.genreClient.send(
            {
                cmd: "get-genre"
            }, {
                id
            }
        )
    }


    @Put("/genres/:id")
    async editGenre(@Body() updateGenreDto: GenreUpdateDto,
                    @Param("id") id: any) {
        return this.genreClient.send(
            {
                cmd: "edit-genre"
            }, {
                updateGenreDto,
                id
            }
        )
    }


    @Delete("/genres/:id")
    async deleteGenre(@Param('id') id: any) {
        return this.genreClient.send(
            {
                cmd: "delete-genre"
            }, {
                id
            }
        )
    }
}