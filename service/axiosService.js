import axios from "axios";
import { AsyncStorage } from "react-native";
import { router } from "expo-router";

const apiUrl = import.meta.env.VITE_CSMS_APPLICATION_API_URL;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the bearer token to each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh or other authentication-related tasks
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 (Unauthorized) and we haven't already tried to refresh the token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const refreshToken = AsyncStorage.getItem("refreshToken");
        const response = await axios.post(`${apiUrl}/refresh-token`, {
          refreshToken,
        });

        // Update the tokens in localStorage
        AsyncStorage.setItem("token", response.data.token);
        AsyncStorage.setItem("refreshToken", response.data.refreshToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle token refresh failure (e.g., logout the user)
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("refreshToken");
        router.navigate("/login"); // Redirect to login page
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
