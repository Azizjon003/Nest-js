import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
const dbConfig = config.get('db');
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type, // type of our database
  host: dbConfig.host, // database host
  port: dbConfig.port, // database host
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // we use the entities defined before
  synchronize: true, // synchronize the database whenever we run the application
  autoLoadEntities: true,
};
