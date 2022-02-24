import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { StatusModule } from './status';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config]
    }),
    DatabaseModule,
    StatusModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
