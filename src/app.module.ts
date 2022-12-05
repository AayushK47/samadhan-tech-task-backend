import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MailmanModule } from '@squareboat/nest-mailman';
import { QueueModule } from '@squareboat/nest-queue';
import config from 'config';
import { ConsoleModule } from '@squareboat/nest-console';
import { UserModule } from './users/users.module';
import { QueueWorkCommand } from './commands/queue';
import { MailService } from './jobs/mail';

@Module({
  imports: [
    ConsoleModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: config,
    }),
    UserModule,
    QueueModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('queue'),
      inject: [ConfigService],
    }),
    MailmanModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('mailman'),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      include: [UserModule],
      context: ({req}) => ({req}),
      playground: true
    }),
  ],
  providers: [QueueWorkCommand, MailService]
})
export class AppModule {}
