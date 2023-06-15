import { TaskEntity } from "../domain/task/entity/task.entity";

export class TaskType {
  id: string;
  description: string;
  completed: boolean;
  createdAt: Date;

  constructor(props: TaskEntity) {
    this.id = props.id;
    this.description = props.description;
    this.completed = props.isCompleted;
    this.createdAt = props.createdAt;
  }
}
