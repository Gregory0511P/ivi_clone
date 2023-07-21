import {Module} from '@nestjs/common';

import {AppService} from './app.service';
import {AppAwardsController} from "./controlles/appAwards.controller";
import {AppRolesController} from "./controlles/appRoles.controller";
import {AppUsersController} from "./controlles/appUsers.controller";
import {AppCountriesController} from "./controlles/appCountries.controller";
import {AppGenresController} from "./controlles/appGenres.controller";
import {AppPersonsController} from "./controlles/appPersons.controller";

@Module({
    imports: [],
    controllers: [
        AppAwardsController,
        AppRolesController,
        AppUsersController,
        AppCountriesController,
        AppGenresController,
        AppPersonsController
    ],
    providers: [AppService],
})
export class AppModule {
}
