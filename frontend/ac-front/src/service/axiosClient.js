import axios from "axios";


// Create instance
const axiosClient = axios.create({
  baseURL: "http://localhost:1200",
  withCredentials: true,
});

// Refresh token function
async function refreshAccessToken() {

  const { data } = await axios.post(
    "http://localhost:1200/auth/refresh",
    {},
    {
      withCredentials: true,
    }
  );
}

// Response interceptor
axiosClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // Do not refresh token for public auth routes
    if (
      originalRequest.url.includes("/auth/login") ||
      originalRequest.url.includes("/auth/register") ||
      originalRequest.url.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    // Handle 401 for protected routes
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();
        return axiosClient(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
