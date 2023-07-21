import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiTags} from "@nestjs/swagger";
import {
    AwardCreateDto,
    NominationCreateDto,
    AwardUpdateDto
} from "@app/common";


@ApiTags("Награды")
@Controller()
export class AppAwardsController {
    constructor(@Inject('AWARD') private readonly awardClient: ClientProxy) {
    }


    @Post("/awards")
    async createAward(@Body() createAwardDto: AwardCreateDto) {
        return this.awardClient.send(
            {
                cmd: "create-award",
            }, {
                createAwardDto
            },
        );
    }


    @Get("/awards")
    async getAllAwards() {
        return this.awardClient.send(
            {
                cmd: "get-all-awards",
            }, {},
        );
    }


    @Get("/awards/:id")
    async getAward(@Param("id") id: any) {
        return this.awardClient.send(
            {
                cmd: "get-award"
            }, {
                id
            }
        )
    }


    @Put("/awards/:id")
    async editAward(@Body() updateAwardDto: AwardUpdateDto,
                    @Param("id") id: any) {
        return this.awardClient.send(
            {
                cmd: "edit-award"
            }, {
                updateAwardDto,
                id
            }
        )
    }


    @Delete("/awards/:id")
    async deleteAward(@Param("id") id: any) {
        return this.awardClient.send(
            {
                cmd: "delete-award"
            }, {
                id
            }
        )
    }


    @Post("/nominations")
    async createNomination(@Body() createNominationDto: NominationCreateDto) {
        return this.awardClient.send(
            {
                cmd: "create-nomination",
            }, {
                createNominationDto
            },
        );
    }


    @Get("/nominations")
    async getAllNominations() {
        return this.awardClient.send(
            {
                cmd: "get-all-nominations",
            }, {},
        );
    }


    @Get("/nominations/:id")
    async getNomination(@Param("id") id: any) {
        return this.awardClient.send(
            {
                cmd: "get-nomination"
            }, {
                id
            }
        )
    }


    @Put("/nominations/:id")
    async editNomination(@Body() createNominationDto: NominationCreateDto,
                         @Param("id") id: any) {
        return this.awardClient.send(
            {
                cmd: "edit-nomination"
            }, {
                createNominationDto,
                id
            }
        )
    }


    @Delete("/nominations/:id")
    async deleteNomination(@Param("id") id: any) {
        return this.awardClient.send(
            {
                cmd: "delete-nomination"
            }, {
                id
            }
        )
    }
}