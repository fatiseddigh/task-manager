import { useState } from "react";
import { useToggleTask } from "../hooks/useToggleTask";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useEditTask } from "../hooks/useEditTask";
import type { UITask } from "../hooks/useCreateTask";

type Props = {
  task: UITask;
};

export default function TaskItem({ task }: Props) {
  const { mutate: toggle } = useToggleTask();
  const { handleDelete } = useDeleteTask();
  const { mutate: editTask } = useEditTask();

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.title);

  const handleSave = () => {
    if (value.trim() === task.title) {
      setIsEditing(false);
      return;
    }

    editTask({
      id: task.id,
      title: value.trim(),
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(task.title);
    setIsEditing(false);
  };

  return (
    <li
      className={`border p-2 rounded flex justify-between items-center transition-all duration-300 ${
        task.optimistic ? "opacity-50" : "opacity-100"
      }`}
    >
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
          onBlur={handleSave}
          autoFocus
          className="border px-2 py-1 rounded w-full mr-2"
        />
      ) : (
        <span
          onDoubleClick={() => {
            setValue(task.title);
            setIsEditing(true);
          }}
          className={`cursor-pointer ${
            task.completed ? "line-through opacity-40" : ""
          }`}
        >
          {task.title}
        </span>
      )}

      <div className="flex gap-2 ml-2">
        <button onClick={() => toggle(task.id)}>
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button className="text-red-500" onClick={() => handleDelete(task)}>
          Delete
        </button>
      </div>
    </li>
  );
}
