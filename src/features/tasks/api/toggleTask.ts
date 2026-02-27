import { axiosInstance } from "../../../shared/axios";

export const toggleTask = async (id: number) => {
  const res = await axiosInstance.patch(`/tasks/${id}`);
  return res.data;
};
