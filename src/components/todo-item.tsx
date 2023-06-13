import { Todo } from "../types/todo.types";

type TodoItemProps = {
  todoItem: Todo;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todoItem,
  onRemove,
  onToggle,
}) => {
  const { id, text, completed } = todoItem;

  return <li className="flex items-center gap-3 justify-between border border-zinc-600 p-2 rounded dark:bg-zinc-800">
    <input type="checkbox" checked={completed} onChange={() => onToggle(id)} />
    <span
      className={`${completed ? "line-through" : ""} flex-1 cursor-pointer`}
      onClick={() => onToggle(id)}
    >
      {text}
    </span>
    <button onClick={() => onRemove(id)} className="ml-2">
      Remove
    </button>
  </li>;
};
