import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthCredintialsDto } from './dto/auth-credintials.dto';

import * as bcrypt from 'bcrypt';
@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async singUp(authCredintialsDto: AuthCredintialsDto): Promise<void> {
    const { username, password } = authCredintialsDto;

    const user = new User();

    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username Alredy exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    // return user;
  }
  async validateUserPassword(
    authCredintialsDto: AuthCredintialsDto,
  ): Promise<string> {
    const { username, password } = authCredintialsDto;
    const user = await this.findOneBy({
      username,
    });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    }
    return null;
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
  async getMe(user): Promise<User> {
    return await this.findOneBy({
      username: user.username,
    });
  }
}
