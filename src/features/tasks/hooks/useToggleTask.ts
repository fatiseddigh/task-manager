import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleTask } from "../api/toggleTask";
import type { UITask } from "./useCreateTask";

export const useToggleTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTask,

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<UITask[]>(["tasks"]) ?? [];

      queryClient.setQueryData<UITask[]>(["tasks"], (old = []) =>
        old.map((task) =>
          task.id === id
            ? { ...task, completed: !task.completed, optimistic: true }
            : task,
        ),
      );

      return { previousTasks };
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData<UITask[]>(["tasks"], (old = []) =>
        old.map((task) =>
          task.id === updatedTask.id
            ? { ...updatedTask, optimistic: false }
            : task,
        ),
      );
    },
    onError: (_err, _id, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },

    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["tasks"] });
    // },
  });
};
