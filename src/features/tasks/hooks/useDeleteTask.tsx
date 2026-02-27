import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/deleteTask";
import type { UITask } from "./useCreateTask";
import toast from "react-hot-toast";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const timeoutRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const mutation = useMutation({
    mutationFn: deleteTask,
  });

  const handleDelete = (task: UITask) => {
    queryClient.setQueryData<UITask[]>(["tasks"], (old = []) =>
      old.filter((t) => t.id !== task.id),
    );

    const timeout = setTimeout(() => {
      mutation.mutate(task.id);
      delete timeoutRef.current[task.id];
    }, 5000);

    timeoutRef.current[task.id] = timeout;

    toast(
      (t) => (
        <span>
          Task
          <strong className="max-w-[150px] inline-block truncate">
            {task.title}
          </strong>
          deleted
          <button
            onClick={() => {
              clearTimeout(timeoutRef.current[task.id]);
              delete timeoutRef.current[task.id];

              queryClient.setQueryData<UITask[]>(["tasks"], (old = []) =>
                [...old, task].sort((a, b) => a.id - b.id),
              );

              toast.dismiss(t.id);
            }}
            style={{ marginLeft: 10, color: "blue" }}
          >
            Undo
          </button>
        </span>
      ),
      { duration: 5000 },
    );
  };

  return { handleDelete };
};
