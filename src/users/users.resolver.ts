import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/user';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtGuard } from './auth.guard';
import { Auth } from './auth.model';
import { FbLoginDto } from './dtos/FbLoginDto';
import { LoginDto } from './dtos/LoginDto';
import { RegisterDto } from './dtos/RegisterDto';
import { User } from './users.model';
import { UserService } from './users.service';

@Resolver()
export class UserResolver {

    constructor(private userService: UserService) {}

    @UseGuards(JwtGuard)
    @Query(returns => User)
    async user(@CurrentUser() user: Record<string, any>) {
        return this.userService.getUserById(user)
    }

    @Mutation(returns => Auth)
    async register(@Args() registerArgs: RegisterDto) {
        const token = this.userService.registerUser(registerArgs);
        return { message:"success", token };
    }

    @Mutation(returns => Auth)
    async login(@Args() loginArgs: LoginDto) {
        const token = this.userService.loginUser(loginArgs);
        return { message:"success", token };
    }

    @Mutation(returns => Auth)
    async fbLogin(@Args() loginArgs: FbLoginDto) {
        const token = this.userService.fbLoginUser(loginArgs);
        return { message:"success", token };
    }
}
