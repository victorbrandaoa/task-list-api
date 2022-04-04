import { Controller, Post, Dependencies, Bind, Req, UseGuards } from '@nestjs/common';
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
  @Bind(Req())
  async login(request) {
    const user = request.user._doc;
    return this.authService.login(user);
  }
}
