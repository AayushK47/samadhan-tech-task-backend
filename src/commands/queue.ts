import { Injectable } from "@nestjs/common";
import { Command, ConsoleIO } from '@squareboat/nest-console';
import { QueueWorker } from "@squareboat/nest-queue";

@Injectable()
@Command('queue:work', { desc: "Run the queue worker" })
export class QueueWorkCommand {
    async handle(_cli: ConsoleIO) {
        console.log('Queue started');
        await QueueWorker.init({}).listen();
    }
}