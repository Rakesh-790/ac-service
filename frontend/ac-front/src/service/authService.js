import axios from "axios";

const API = "http://localhost:1200/auth";

axios.defaults.withCredentials = true;

export const login = async (credentials) => {
  const response = await axios.post(`${API}/login`, credentials, {
    withCredentials: true,
  });

  return response;
};

export const registerUser = async (data) => {
  return axios.post(`${API}/register`, data, {
    withCredentials: true,
  });
};

export const logout = async () => {
  const token = localStorage.getItem("accessToken");

  return axiosClient.post(
    `${API}/logout`,
    {},
    {
      withCredentials: true
    }
  );
};
