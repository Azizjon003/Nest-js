import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredintialsDto } from './dto/auth-credintials.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(authCredintialsDto: AuthCredintialsDto): Promise<void> {
    return this.userRepository.singUp(authCredintialsDto);
  }
}
