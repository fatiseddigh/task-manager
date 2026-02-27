import { axiosInstance } from "../../../shared/axios";

export const deleteTask = async (id: number) => {
  const res = await axiosInstance.delete(`/tasks/${id}`);
  return res.data;
};
