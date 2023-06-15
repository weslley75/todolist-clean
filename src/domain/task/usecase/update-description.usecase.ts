import { TaskRepository } from "../repository/task.repository";

export class UpdateDescriptionUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string, description: string) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    task.description = description;

    return this.taskRepository.update(task);
  }
}
