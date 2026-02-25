import { axiosInstance } from "../../../shared/axios";
import type { Task } from "./getTasks";

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const response = await axiosInstance.post("/tasks", task);
  return response.data;
};
