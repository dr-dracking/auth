import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.health')
  healthCheck() {
    return 'Auth service is up and running';
  }

  @MessagePattern('auth.login')
  login(@Payload() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @MessagePattern('auth.verify')
  verifyToken(@Payload() token: string) {
    return this.authService.verifyToken(token);
  }
}
