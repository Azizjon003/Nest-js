import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthCredintialsDto } from './dto/auth-credintials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { GetUser } from './get-user.decorater';
import { AuthGuard } from '@nestjs/passport';

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

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  getMe(@GetUser() user: User): Promise<User> {
    return this.authService.getMe(user);
  }
  // @UseGuards(AuthGuard())
  // @Post('/test')
  // test(@GetUser() user) {
  //   cons ole.log('user', user);

  //   // console.log('req', req);
  // }
}
