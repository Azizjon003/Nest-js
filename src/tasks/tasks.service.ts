import { Injectable, NotFoundException } from '@nestjs/common';

import { createTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { Task } from './tasks.entity';
import { TaskStatus } from './tast-status.enum';
import { User } from 'src/auth/user.entity';
import { UserRepository } from 'src/auth/user.repository';
// import { TaskStatus } from './tast-status.enum';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}
  // private tasks: Task[] = [];
  // getAllTasks() {
  //   let tasks = this.tasks;
  //   if (tasks.length === 0) {
  //     throw new NotFoundException(`No task found`);
  //   }
  //   return tasks;
  // }
  async getAllTasks(user: User): Promise<Task[]> {
    const users = await User.findOne({ where: { username: user.username } });
    let query = this.taskRepository.createQueryBuilder('task');
    query = query.where('task.userId = :userId', { userId: users.id });
    const tasks = await query.getMany();
    return tasks;
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    console.log(user);
    const found = await this.taskRepository.findOne({
      where: {
        id,
        userId: user.id,
      },
    });
    console.log(found);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }
  // async getTaskById(id: string): Promise<Task> {
  //   let found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }
  //   return found;
  // }

  async createTask(createTaskDto: createTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }
  // async createTask(createTaskDto: createTaskDto): Promise<Task> {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: randomUUID(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({
      id,
      userId: user.id,
    });
    console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
  // deleteTask(id: string): void {
  //   let task = this.tasks.find((task) => task.id === id);
  //   if (!task) {
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }
  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    task.save();
    return task;
  }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.tasks.find((task) => task.id === id);
  //   if (!task) {
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }
  //   task.status = status;
  //   return task;
  // }
}
