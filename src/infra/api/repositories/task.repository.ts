import { TaskItem } from "@prisma/client";
import { TaskRepository } from "../../../domain/task/repository/task.repository";
import { TaskEntity } from "../../../domain/task/entity/task.entity";
import axios from "axios";

export class TaskApiRepository implements TaskRepository {
  private toApi(task: TaskEntity): TaskItem {
    return {
      id: task.id,
      description: task.description,
      isCompleted: task.isCompleted,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt ?? null,
    };
  }

  private fromApi(task: TaskItem): TaskEntity {
    return new TaskEntity(
      {
        description: task.description,
        isCompleted: task.isCompleted,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt ?? undefined,
      },
      task.id
    );
  }

  async create(newTask: TaskEntity) {
    await axios.post("/api/todoitem", this.toApi(newTask));
  }
  
  async findAll() {
    const { data } = await axios.get<TaskItem[]>("/api/todoitem");
    return data.map((task) => this.fromApi(task));
  }

  async findById(id: string) {
    const urlSearch = new URLSearchParams();
    urlSearch.append("id", id);

    const { data } = await axios.get<TaskItem>(`/api/todoitem?${urlSearch}`);
    return this.fromApi(data);
  }

  async update(task: TaskEntity) {
    await axios.put("/api/todoitem/", this.toApi(task));
  }
  async delete(id: string) {
    const urlSearch = new URLSearchParams();
    urlSearch.append("id", id);

    await axios.delete(`/api/todoitem?${urlSearch}`);
  }
}
