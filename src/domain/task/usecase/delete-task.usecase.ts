import { TaskRepository } from "../repository/task.repository";

export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  execute(id: string) {

    return this.taskRepository.delete(id);
  }
}
