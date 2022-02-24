import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusService {
  
  getApiStatus() {
    return {
      'status': 'up',
      'version': '1.0.0'
    }
  }
}
