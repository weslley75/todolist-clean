"use client";
import { Input } from "../components/input";
import { useState } from "react";
import { TaskType } from "../types/task.types";
import { TaskComponent } from "../components/task";

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const addTask = (message: string) => {
    const task: TaskType = {
      id: crypto.randomUUID(),
      description: message,
      completed: false,
      createdAt: new Date(),
    };

    setTasks([...tasks, task]);
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
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
