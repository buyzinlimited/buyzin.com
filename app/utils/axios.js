import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://buyzin.ashikahmed.net", // http://127.0.0.1:8000  https://buyzin.ashikahmed.net
  headers: {
    "Content-type": "application/json",
    Author: "Ashik Ahmed",
  },
  withCredentials: false,
  withXSRFToken: false,
});

// Add a request interceptor
// Interceptor for request
apiClient.interceptors.request.use(
  (config) => {
    // Add any custom headers or modify the request config here
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers["Authorization"] = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Remove the token from local storage (or wherever you store it)
      const authStore = useAuthStore();
      authStore.$reset();
      return navigateTo("/auth/login");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
