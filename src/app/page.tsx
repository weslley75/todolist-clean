"use client";
import { Input } from "../components/input";
import { useState } from "react";
import { Todo } from "../types/todo.types";
import { TodoItem } from "../components/todo-item";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (message: string) => {
    const todo: Todo = {
      id: crypto.randomUUID(),
      text: message,
      completed: false,
      createdAt: new Date(),
    };

    setTodos([...todos, todo]);
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = e.currentTarget.message.value;
    addTodo(message);
    e.currentTarget.message.value = "";
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 dark:bg-zinc-900 dark:text-white">
      <div className="flex flex-col max-w-xl w-full">
        <h1 className="text-4xl font-bold text-center p-4">Todolist</h1>
        <form className="flex w-full" onSubmit={handleSubmit}>
          <Input
            placeholder="What needs to be done?"
            className="w-full rounded-r-none flex-grow text-black outline-none"
            name="message"
          />
          <button className="bg-blue-500 text-white p-2 rounded rounded-l-none">
            Add
          </button>
        </form>

        <ul className="flex flex-col w-full mt-2 gap-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todoItem={todo}
              onRemove={removeTodo}
              onToggle={toggleTodo}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
