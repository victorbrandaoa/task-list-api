import { Module } from '@nestjs/common';
import { StatusController } from '../controllers';
import { StatusService } from '../services';

@Module({
  controllers: [StatusController],
  providers: [StatusService]
})
export class StatusModule {}
