import { TaskType } from "../types/task.types";

type TaskComponentProps = {
  task: TaskType;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
};

export const TaskComponent: React.FC<TaskComponentProps> = ({
  task,
  onRemove,
  onToggle,
}) => {
  const { id, description, completed } = task;

  return (
    <li className="flex items-center gap-3 justify-between border border-zinc-600 p-2 rounded dark:bg-zinc-800">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <span
        className={`${completed ? "line-through" : ""} flex-1 cursor-pointer`}
        onClick={() => onToggle(id)}
      >
        {description}
      </span>
      <button onClick={() => onRemove(id)} className="ml-2">
        Remove
      </button>
    </li>
  );
};
