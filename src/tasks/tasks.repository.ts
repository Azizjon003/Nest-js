import { Repository, EntityRepository, DataSource } from 'typeorm';
import { Task } from './tasks.entity';
import { Injectable } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tast-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
  async createTask(createTaskDto: createTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    const users = await User.findOne({ where: { username: user.username } });
    task.user = users;
    // await this.save(task);
    await task.save();
    delete task.user;
    return task;
  }
}
