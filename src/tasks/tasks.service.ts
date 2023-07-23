import { Injectable, NotFoundException } from '@nestjs/common';

import { createTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { Task } from './tasks.entity';
import { TaskStatus } from './tast-status.enum';
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
  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: {
        id,
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

  async createTask(createTaskDto: createTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
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

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
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
  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
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
