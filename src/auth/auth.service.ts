import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredintialsDto } from './dto/auth-credintials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredintialsDto: AuthCredintialsDto): Promise<void> {
    return this.userRepository.singUp(authCredintialsDto);
  }
  async signIn(
    authCredintialsDto: AuthCredintialsDto,
  ): Promise<{ accessToken: string }> {
    console.log('authCredintialsDto', authCredintialsDto);
    const username = await this.userRepository.validateUserPassword(
      authCredintialsDto,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { username };

    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
