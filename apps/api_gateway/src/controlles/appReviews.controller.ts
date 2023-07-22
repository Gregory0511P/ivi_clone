import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Req} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {
    ReviewCreateDto,
    Review
} from "@app/common";


@ApiTags("Комментарии")
@Controller()
export class AppReviewController {
    constructor(@Inject('REVIEW') private readonly reviewClient: ClientProxy) {
    }


    @Post("/films/:filmId")
    async addReview(@Body() createReviewDto: ReviewCreateDto,
                    @Req() request,
                    @Param("filmId") filmId: any) {
        const user = request.user;
        const userId = +user.sub;

        return this.reviewClient.send(
            {
                cmd: "create-review",
            }, {
                createReviewDto,
                filmId,
                userId
            },
        );
    }

    @Post("/films/:filmId/review/:parentId")
    async addChildReview(@Body() createReviewDto: ReviewCreateDto,
                         @Req() request,
                         @Param("filmId") filmId: any,
                         @Param("parentId") parentId: any) {
        const user = request.user;
        const userId = +user.sub;

        return this.reviewClient.send(
            {
                cmd: "create-review",
            }, {
                createReviewDto,
                filmId,
                userId,
                parentId
            },
        );
    }

    @ApiOperation({summary: "Получение списка всех комментариев"})
    @ApiResponse({status: 200, type: [Review]})
    @Get("/reviews")
    async getAllReviews() {
        return this.reviewClient.send(
            {
                cmd: "get-all-reviews",
            }, {},
        );
    }

    @ApiOperation({summary: "Получение списка комментария по id"})
    @ApiResponse({status: 200, type: Review})
    @ApiParam({name: "id", example: 1})
    @Get("/reviews/:id")
    async getReview(@Param("id") id: any) {
        return this.reviewClient.send(
            {
                cmd: "get-review"
            }, {
                id
            }
        )
    }


    @Put("/reviews/:id")
    async editReview(@Body() createReviewDto: ReviewCreateDto,
                     @Param("id") id: any) {
        return this.reviewClient.send(
            {
                cmd: "edit-review"
            }, {
                createReviewDto,
                id
            }
        )
    }


    @Delete("/reviews/:id")
    async deleteReview(@Param("id") id: any,
                       @Req() request) {
        const user = request.user;
        const userId = +user.sub;

        return this.reviewClient.send(
            {
                cmd: "delete-review"
            }, {
                id,
                userId
            }
        )
    }
}