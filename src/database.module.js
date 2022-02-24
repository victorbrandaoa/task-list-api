import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService) => ({
        uri: `mongodb://${configService.get('database.host')}:${configService.get('database.port')}`,
        dbName: configService.get('database.name')
      }),
      inject: [ConfigService]
    })
  ]
})
export class DatabaseModule {}
