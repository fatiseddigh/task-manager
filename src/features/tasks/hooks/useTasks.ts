import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/getTasks";
import type { UITask } from "./useCreateTask";

export const useTasks = () => {
  return useQuery<UITask[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
};
