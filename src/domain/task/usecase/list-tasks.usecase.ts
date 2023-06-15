import { TaskType } from "../../../types/task.types";
import { TaskRepository } from "../repository/task.repository";

export class ListTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute() {
    const tasks = await this.taskRepository.findAll();

    return tasks.map((task) => new TaskType(task));
  }
}
