import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth';
import { DatabaseModule } from './database.module';
import { StatusModule } from './status';
import { UsersModule } from './users';
import { CategoriesModule } from './categories';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config]
    }),
    DatabaseModule,
    StatusModule,
    UsersModule,
    CategoriesModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
