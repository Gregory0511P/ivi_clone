import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {RoleCreateDto} from "@app/common";


@ApiTags("Роли пользователей")
@Controller("/roles")
export class AppRolesController {
    constructor(@Inject('ROLES') private readonly rolesClient: ClientProxy) {
    }


    @Post()
    async createRole(@Body() createRoleDto: RoleCreateDto) {
        return this.rolesClient.send({
            cmd: "create-role"
        }, {
            createRoleDto
        });
    };


    @Get()
    async getAllRoles() {
        return this.rolesClient.send({
            cmd: "get-all-roles"
        }, {});
    };


    @Get("/:id")
    async getRoleById(@Param("id") id: string) {
        return this.rolesClient.send({
            cmd: "get-role-by-id"
        }, {
            id
        });

    };


    @Get("/value/:value")
    async getRoleByValue(@Param("value") value: string) {
        return this.rolesClient.send({
            cmd: "get-role-by-value"
        }, {
            value
        });
    };


    @Put("/:id")
    async updateRole(@Param("id") id: any,
                     @Body() createRoleDto: RoleCreateDto) {
        return this.rolesClient.send({
            cmd: "update-role"
        }, {
            createRoleDto,
            id
        });
    };


    @Delete("/:id")
    async deleteRole(@Param("id") id: any) {
        return this.rolesClient.send({
            cmd: "delete-role"
        }, {
            id
        });
    };
}