import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres', // type of our database
  host: 'localhost', // database host
  port: 5432, // database host
  username: 'postgres',
  password: '1234',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // we use the entities defined before
  synchronize: true, // synchronize the database whenever we run the application
};
