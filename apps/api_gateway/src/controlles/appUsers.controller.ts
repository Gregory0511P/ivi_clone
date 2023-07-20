import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiTags} from "@nestjs/swagger";
import {
    RoleAddDto,
    RegistrationDto,
    UserUpdateDto
} from '@app/common';


@ApiTags("Пользователи")
@Controller("/users")
export class AppUsersController {
    constructor(@Inject('USERS') private readonly userClient: ClientProxy) {
    }


    @Post()
    async createUser(@Body() registrationDto: RegistrationDto) {
        const role = "USER";

        return this.userClient.send({
            cmd: "user-registration"
        }, {
            registrationDto,
            role
        });
    };


    @Get()
    async getAllUsers() {
        return this.userClient.send({
            cmd: "get-all-users"
        }, {});
    };


    @Get("/:id")
    async getUserById(@Param("id") id: any) {
        return this.userClient.send({
            cmd: "get-user-by-id"
        }, {
            id
        });
    };


    @Get("email/:email")
    async getUserByEmail(@Param("email") email: string) {
        return this.userClient.send({
            cmd: "get-user-by-email"
        }, {
            email
        });
    };


    @Get("phone/:number")
    async getUserByPhone(@Param("number") number: string) {
        return this.userClient.send({
            cmd: "get-user-by-phone"
        }, {
            number
        });
    };


    @Get("filter/:value1/:value2")
    async UserCountryAndAgeFilters(@Param("value1") value1: string,
                                   @Param("value2") value2?: string,
                                   @Query() query?) {

        return this.userClient.send({
            cmd: "get-users-by-params"
        }, {
            value1,
            value2,
            query
        });
    };


    @Get("filter/:value")
    async UserCountryOrAgeFilter(@Param("value") value: string,
                                 @Query() query?) {
        return this.userClient.send({
            cmd: "get-users-by-param"
        }, {
            value,
            query
        });
    };


    @Get("role/:role")
    async getUsersByRole(@Param("role") role: string,) {
        return this.userClient.send({
            cmd: "get-users-by-role"
        }, {
            role
        });
    };


    @Put("/:id")
    async updateUser(@Param("id") id: string,
                     @Body() updateUserDto: UserUpdateDto) {
        return this.userClient.send({
            cmd: "update-user"
        }, {
            updateUserDto,
            id
        });
    };


    @Delete("/:id")
    async deleteUser(@Param("id") id: string) {
        return this.userClient.send({
            cmd: "delete-user"
        }, {
            id
        });
    };


    @Post("role/add")
    async addRoleToUser(@Body() addRoleDto: RoleAddDto) {
        return this.userClient.send({
            cmd: "add-role-to-user"
        }, {
            addRoleDto
        });
    };


    @Post("role/delete")
    async deleteRoleFromUser(@Body() addRoleDto: RoleAddDto) {
        return this.userClient.send({
            cmd: "delete-role-from-user"
        }, {
            addRoleDto
        });
    };


    @Get("/:id/reviews")
    async getAllUsersReviews(@Param("id") id: string) {
        return this.userClient.send({
            cmd: "get-all-users-reviews"
        }, {
            id
        });
    };
}