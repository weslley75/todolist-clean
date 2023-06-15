import { TaskEntity } from "../../../domain/task/entity/task.entity";
import { TaskRepository } from "../../../domain/task/repository/task.repository";

export class TaskLocalStorageRepository implements TaskRepository {
  constructor(private localStorage: Storage) {}

  get tasks(): TaskEntity[] {
    const json = this.localStorage.getItem("tasks");
    const tasks = json ? JSON.parse(json) : [];

    return tasks.map((task: TaskEntity) => new TaskEntity(task, task.id));
  }

  set tasks(tasks: TaskEntity[]) {
    this.localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  async create(newTask: TaskEntity) {
    this.tasks = [...this.tasks, newTask]
  }

  async findAll(): Promise<TaskEntity[]> {
      return this.tasks
  }

  async findById(id: string): Promise<TaskEntity | undefined> {
      return this.tasks.find((task) => task.id === id)
  }

  async update(task: TaskEntity) {
    const tasks = this.tasks;

    const index = this.tasks.findIndex((t) => t.id === task.id);
    tasks[index] = task

    this.tasks = tasks
  }

  async delete(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
