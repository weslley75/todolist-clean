import { TaskEntity } from "../../../domain/task/entity/task.entity";
import { TaskRepository } from "../../../domain/task/repository/task.repository";

export class TaskInMemoryRepository implements TaskRepository {
  private tasks: TaskEntity[] = [];

  async create(task: TaskEntity): Promise<void> {
    this.tasks.push(task);
  }

  async findAll() {
    return this.tasks;
  }

  async findById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  async update(task: TaskEntity) {
    const index = this.tasks.findIndex((t) => t.id === task.id);

    this.tasks[index] = task;
  }

  async delete(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
