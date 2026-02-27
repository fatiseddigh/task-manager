import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTask } from "../api/editTask";
import type { UITask } from "./useCreateTask";

export const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editTask,

    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<UITask[]>(["tasks"]);

      queryClient.setQueryData<UITask[]>(["tasks"], (old = []) =>
        old.map((task) =>
          task.id === updatedTask.id
            ? { ...task, title: updatedTask.title }
            : task,
        ),
      );

      return { previousTasks };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
