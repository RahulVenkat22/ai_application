import API from './api'

export const loginUser = async (email: string, password: string) => {
  const res = await API.post("/auth/login", { email, password });

  localStorage.setItem("access_token", res.data.access_token);
  localStorage.setItem("refresh_token", res.data.refresh_token);

  return res.data;
};

export const logoutUser = () => {
  localStorage.clear();
  window.location.href = "/login";
};