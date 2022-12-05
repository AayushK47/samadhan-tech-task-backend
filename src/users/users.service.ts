import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Dispatch } from '@squareboat/nest-queue';
import { hashSync } from 'bcrypt';
import { User } from 'src/common/interfaces/users';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
    private users: User[] = [];

    constructor(private jwt: JwtService) {}

    registerUser(user: User) {
        if(this.users.filter(u => user.email === u.email).length > 0) {
            throw new NotFoundException('User Already Exists');
        }

        const hashedPassword = hashSync(user.password, 12);

        user = {...user, password: hashedPassword, id: uuid()};
        this.users.push(user);

        Dispatch({
            job: 'SEND_SIGNUP_MAIL',
            data: {
                name: user.name,
                email: user.email,
                subject: 'We are happy to have you'
            }
        })

        const token = this.jwt.sign({ id: user.id });
        return token;
    }

    loginUser({ email, password }: User) {
        const [user] = this.users.filter(user => user.email === email)
        if(!user) {
            throw new NotFoundException('User Already Exists');
        }

        if(!hashSync(password, user.password)) {
            throw new NotFoundException('Incorrect password');
        }

        const token = this.jwt.sign({ id: user.id });
        return token;
    }

    fbLoginUser({ email, name }: User) {
        let [user] = this.users.filter(user => user.email === email);

        if(!user) {
            user = { name, email, id: uuid() }
            this.users.push(user);
            Dispatch({
                job: 'SEND_SIGNUP_MAIL',
                data: {
                    name: user.name,
                    email: user.email,
                    subject: 'We are happy to have you'
                }
            })
        }

        const token = this.jwt.sign({ id: user.id });
        return token;
    }

    getUserById(user: User) {
        user = this.users.filter(u => user.id === u.id)[0];
        return {...user, password: undefined};
    }
}