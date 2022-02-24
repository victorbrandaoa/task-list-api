import { Controller, Get, Dependencies } from '@nestjs/common';
import { StatusService } from '../services';

@Controller('status')
@Dependencies(StatusService)
export class StatusController {

  constructor(statusService) {
    this.statusService = statusService;
  }

  @Get()
  getApiStatus() {
    return this.statusService.getApiStatus();
  }
}
