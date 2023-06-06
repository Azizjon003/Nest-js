import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];

  getAllTasks() {
    return this.tasks;
  }
}
