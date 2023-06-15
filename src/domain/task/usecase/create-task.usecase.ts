import { TaskEntity } from "../entity/task.entity";
import { TaskRepository } from "../repository/task.repository";

export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(description: string) {
    if (!description) {
      throw new Error("Description is required");
    }
    const task = new TaskEntity({ description });

    return this.taskRepository.create(task);
  }
}
