import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiTags} from "@nestjs/swagger";
import {CountryCreateDto, CountryUpdateDto} from "@app/common";


@ApiTags("Страны")
@Controller()
export class AppCountriesController {
    constructor(@Inject('COUNTRY') private readonly countryClient: ClientProxy) {}


    @Post("/countries")
    async createCountry(@Body() createCountryDto: CountryCreateDto) {
        return this.countryClient.send(
            {
                cmd: "create-country",
            }, {
                createCountryDto
            },
        );
    }


    @Get("/countries")
    async getAllCountries() {
        return this.countryClient.send(
            {
                cmd: "get-all-countries",
            }, {

            },
        );
    }


    @Get("/countries/:id")
    async getCountry(@Param("id") id: any) {
        return this.countryClient.send(
            {
                cmd: "get-country"
            }, {
                id
            }
        )
    }


    @Put("/countries/:id")
    async editCountry(@Body() updateCountryDto: CountryUpdateDto,
                      @Param("id") id: any) {
        return this.countryClient.send(
            {
                cmd: "edit-country"
            }, {
                updateCountryDto,
                id
            }
        )
    }


    @Delete("/countries/:id")
    async deleteCountry(@Param("id") id: any) {
        return this.countryClient.send(
            {
                cmd: "delete-country"
            }, {
                id
            }
        )
    }
}