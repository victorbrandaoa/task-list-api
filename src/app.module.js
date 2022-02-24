import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { StatusModule } from './status';
import { UsersModule } from './users';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config]
    }),
    DatabaseModule,
    StatusModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
