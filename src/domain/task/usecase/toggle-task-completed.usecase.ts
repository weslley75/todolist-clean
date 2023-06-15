import { TaskRepository } from "../repository/task.repository";

export class ToggleTaskCompletedUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    task.toggleCompleted();

    return this.taskRepository.update(task);
  }
}
