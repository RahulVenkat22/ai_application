import axiosInstance from "../api/axiosInstance";

export const getUsers = () => {
  return axiosInstance.get("/user/");
};

export const createUser = (data: any) => {
  return axiosInstance.post("/user/", data);
};

export const updateUser = (id: string | number, data: any) => {
  return axiosInstance.put(`/user/${id}`, data);
};

export const deleteUser = (id: string | number) => {
  return axiosInstance.delete(`/user/${id}`);
};