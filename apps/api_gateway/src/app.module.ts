import {Module} from '@nestjs/common';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {
    CommonModule,
    PostgresUserDbModule,
    User
} from "@app/common";
import {AppService} from "./app.service";
import {AppFilmsController} from "./controlles/appFilms.controller";
import {AppAwardsController} from "./controlles/appAwards.controller";
import {AppCountriesController} from "./controlles/appCountries.controller";
import {AppGenresController} from "./controlles/appGenres.controller";
import {AppPersonsController} from "./controlles/appPersons.controller";
import {AppAuthController} from "./controlles/appAuth.controller";
import {AppUsersController} from "./controlles/appUsers.controller";
import {AppRolesController} from "./controlles/appRoles.controller";
import {VkStrategy} from "../utils/vk.strategy";
import {GoogleStrategy} from "../utils/google.strategy";
import {SessionSerializer} from "../utils/sessionSerializer";
import {AppParseController} from "./controlles/appParser.controller";
import {AppReviewController} from "./controlles/appReviews.controller";
import {SequelizeModule} from "@nestjs/sequelize";


@Module({
    imports: [
        PassportModule.register({session: true}),
        JwtModule.register({
            secret: process.env.JWT_SECRET || "SECRET",
            signOptions: {
                expiresIn: "24h"
            }
        }),
        PostgresUserDbModule,
        SequelizeModule.forFeature([User]),
        CommonModule.registerRmq({name: 'USERS'}),
        CommonModule.registerRmq({name: 'ROLES'}),
        CommonModule.registerRmq({name: 'AUTH'}),
        CommonModule.registerRmq({name: 'FILM'}),
        CommonModule.registerRmq({name: 'COUNTRY'}),
        CommonModule.registerRmq({name: 'AWARD'}),
        CommonModule.registerRmq({name: 'GENRE'}),
        CommonModule.registerRmq({name: 'PERSON'}),
        CommonModule.registerRmq({name: 'REVIEW'}),
    ],
    controllers: [AppFilmsController, AppAwardsController, AppCountriesController, AppGenresController,
        AppPersonsController, AppParseController, AppAuthController, AppUsersController, AppRolesController,
        AppReviewController],
    providers: [AppService, VkStrategy, GoogleStrategy, SessionSerializer]
})
export class AppModule {
}
