import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthCredintialsDto } from './dto/auth-credintials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorater';
import { User } from './user.entity';

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

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredintialsDto: AuthCredintialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredintialsDto);
  }
  @UseGuards(AuthGuard())
  @Post('/test')
  test(@GetUser() user) {
    console.log('user', user);

    // console.log('req', req);
  }
}
