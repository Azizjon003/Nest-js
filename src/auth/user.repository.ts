import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthCredintialsDto } from './dto/auth-credintials.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async singUp(authCredintialsDto: AuthCredintialsDto): Promise<void> {
    const { username, password } = authCredintialsDto;

    // const exists = await this.findOne({
    //   where: {
    //     username,
    //   },
    // });

    const user = new User();

    user.username = username;
    user.password = password;
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
}
