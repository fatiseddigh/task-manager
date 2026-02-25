import { axiosInstance } from "../../../shared/axios";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export const getTasks = async (): Promise<Task[]> => {
  const response = await axiosInstance.get("/tasks");
  return response.data;
};
