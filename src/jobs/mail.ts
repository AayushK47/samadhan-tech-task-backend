import { Injectable } from "@nestjs/common";
import { Mailman, MailMessage } from "@squareboat/nest-mailman";
import { Job } from "@squareboat/nest-queue";

@Injectable()
export class MailService {
    @Job('SEND_SIGNUP_MAIL', {})
    async sendSignupMail(data: Record<string, any>) {
        const mail = MailMessage.init()
        mail.subject(data.subject);
        mail.greeting(`Hello ${data.name}`);
        mail.line('Welcome! We are pleased that you joined');

        Mailman.init()
            .to(data.email)
            .send(mail);

    }
}