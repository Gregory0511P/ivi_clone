import {Inject, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";
import {ReviewCreateDto, Review, ReviewUpdateDto} from "@app/common";


@Injectable()
export class ReviewService {
    constructor(@InjectModel(Review) private reviewRepository: typeof Review,
                @Inject('USERS') private readonly usersClient: ClientProxy) {
    }

    async createReview(createReviewDto: ReviewCreateDto, filmId, userId, parentId?) {
        const review = await this.reviewRepository.create(createReviewDto);
        review.filmId = filmId;
        review.userId = userId;

        let user = await lastValueFrom(this.usersClient.send({
            cmd: "add-review-to-user"
        }, {
            review,
            id: userId
        }))

        if (parentId) {
            review.parentId = parentId;
        }

        await review.save();

        return review;
    }

    async getAllReviews() {
        return await this.reviewRepository.findAll();
    }

    async getReviewById(id: number) {
        return await this.reviewRepository.findByPk(id, {
            include: {
                all: true
            }
        });
    }

    async editReview(updateReviewDto: ReviewUpdateDto, id: number) {
        await this.reviewRepository.update({...updateReviewDto}, {
            where: {
                id
            }
        });

        return this.getReviewById(id);
    }

    async deleteReview(id: number, userId: number) {
        let user = await lastValueFrom(this.usersClient.send({
            cmd: "delete-review-from-user"
        }, {
            id: userId,
            reviewId: id
        }))

        return await this.reviewRepository.destroy({
            where: {
                id
            }
        });
    }
}
