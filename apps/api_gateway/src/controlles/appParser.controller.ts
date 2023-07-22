import {Controller, Get, Param, Query} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {AppService} from "../app.service";


@ApiTags("Парсинг")
@Controller()
export class AppParseController {
    constructor(private appService: AppService) {
    }


    @Get("/parse")
    async startParser(@Query() query) {
        return this.appService.parseFilms(query);
    }


    @Get("/parse/:id")
    async parseOneFilm(@Param("id") id: any) {
        return this.appService.parseOneFilm(id);
    }
}