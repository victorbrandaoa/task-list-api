import { Controller, Post, Dependencies, Bind, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
@Dependencies(AuthService)
export class LoginController {
  constructor(authService) {
    this.authService = authService;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @Bind(Body())
  async login(user) {
    return this.authService.login(user);
  }
}
