import { TaskEntity } from "../entity/task.entity";

export abstract class TaskRepository {
  abstract findAll(): Promise<TaskEntity[]>;
  abstract findById(id: string): Promise<TaskEntity | undefined>;
  abstract create(task: TaskEntity): Promise<void>;
  abstract update(task: TaskEntity): Promise<void>;
  abstract delete(id: string): Promise<void>;
}