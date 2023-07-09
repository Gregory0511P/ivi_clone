import {Module} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {Review} from "@app/common/models/review_model/rerview.model";
import {Film} from "@app/common/models/film_model/film.model";

@Module({
    imports: [
        SequelizeModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                dialect: "postgres",
                name: "film_ivi",
                host: configService.get("POSTGRES_HOST"),
                port: +configService.get("POSTGRES_PORT"),
                username: configService.get("POSTGRES_USER"),
                password: configService.get("POSTGRES_PASSWORD"),
                database: configService.get("POSTGRES_FILM_DB"),
                models: [Film, Review],
                autoLoadModels: true,
                synchronize: true
            }),
            inject: [ConfigService],
        }),
    ],
})
export class PostgresFilmDbModule {}