import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()

        try {
            if (req.headers.authorization) {
                const authHeader = req.headers.authorization;
                const [bearer, token] = authHeader.split(" ");

                if (bearer !== "Bearer" || !token) {
                    throw new UnauthorizedException({message: "Пользователь не авторизован"})
                }

                req.user = this.jwtService.decode(token);

                return true;
            }

            return req.isAuthenticated();
        } catch (err) {
            throw new UnauthorizedException({message: "Пользователь не авторизован"})
        }
    }
}