import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredintialsDto } from './dto/auth-credintials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(
    @Body(ValidationPipe)
    authCredintialsDto: AuthCredintialsDto,
  ) {
    return this.authService.signUp(authCredintialsDto);
  }
}
