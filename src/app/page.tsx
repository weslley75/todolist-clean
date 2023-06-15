"use client";
import { Input } from "../components/input";
import { useEffect, useMemo, useState } from "react";
import { TaskType } from "../types/task.types";
import { TaskComponent } from "../components/task";
import { TaskRepository } from "../domain/task/repository/task.repository";
import { CreateTaskUseCase } from "../domain/task/usecase/create-task.usecase";
import { DeleteTaskUseCase } from "../domain/task/usecase/delete-task.usecase";
import { ListTasksUseCase } from "../domain/task/usecase/list-tasks.usecase";
import { ToggleTaskCompletedUseCase } from "../domain/task/usecase/toggle-task-completed.usecase";
import { TaskApiRepository } from "../infra/api/repositories/task.repository";

export default function Home() {
  const repository: TaskRepository = useMemo(
    () => new TaskApiRepository(),
    []
  );

  const createTaskUseCase = new CreateTaskUseCase(repository);
  const listTasksUseCase = new ListTasksUseCase(repository);
  const deleteTaskUseCase = new DeleteTaskUseCase(repository);
  const toggleTaskUseCase = new ToggleTaskCompletedUseCase(repository);

  const [tasks, setTasks] = useState<TaskType[]>([]);

  const getTasks = () => {
    listTasksUseCase
      .execute()
      .then((tasks) => setTasks(tasks))
      .catch(console.error);
  };

  useEffect(getTasks, []);

  const addTask = (message: string) => {
    createTaskUseCase.execute(message).then(getTasks).catch(console.error);
  };

  const removeTask = (id: string) => {
    deleteTaskUseCase.execute(id).then(getTasks).catch(console.error);
  };

  const toggleTask = (id: string) => {
    toggleTaskUseCase.execute(id).then(getTasks).catch(console.error);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const description = e.currentTarget.description.value;
    if (!description) return;
    addTask(description);
    e.currentTarget.description.value = "";
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 dark:bg-zinc-900 dark:text-white">
      <div className="flex flex-col max-w-xl w-full">
        <h1 className="text-4xl font-bold text-center p-4">Todolist</h1>
        <form className="flex w-full" onSubmit={handleSubmit}>
          <Input
            placeholder="What needs to be done?"
            className="w-full rounded-r-none flex-grow text-black outline-none"
            name="description"
          />
          <button className="bg-blue-500 text-white p-2 rounded rounded-l-none">
            Add
          </button>
        </form>

        <ul className="flex flex-col w-full mt-2 gap-2">
          {tasks.map((task) => (
            <TaskComponent
              key={task.id}
              task={task}
              onRemove={removeTask}
              onToggle={toggleTask}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
