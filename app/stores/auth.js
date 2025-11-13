import apiClient from "~/utils/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loading: false,
    user: null,
    token: null,
    errors: {},
  }),

  persist: true,

  getters: {
    loggedIn: (state) => !!state.token,
  },

  actions: {
    async register(formData) {
      this.loading = true;
      try {
        const response = await apiClient.post("/api/auth/register", formData);
        if (response.status === 200) {
          return new Promise((resolve) => {
            resolve(response);
          });
        }
      } catch (error) {
        return new Promise((reject) => {
          reject(error.response);
        });
      } finally {
        this.loading = false;
      }
    },

    async verify(email, expires, signature) {
      try {
        const response = await apiClient.post(
          `/api/email/verify?email=${email}&expires=${expires}&signature=${signature}`
        );

        console.log(response);
      } catch (error) {
        return new Promise((reject) => {
          reject(error.response);
        });
      } finally {
        this.loading = false;
      }
    },

    async forgot(formData) {
      this.loading = true;
      try {
        const response = await apiClient.post("/api/password/email", formData);
        if (response.status === 200) {
          return new Promise((resolve) => {
            resolve(response);
          });
        }
      } catch (error) {
        return new Promise((reject) => {
          reject(error.response);
        });
      } finally {
        this.loading = false;
      }
    },

    async reset(formData) {
      this.loading = true;
      try {
        const response = await apiClient.post("/api/password/reset", {});
        if (response.status === 200) {
          return new Promise((resolve) => {
            resolve(response);
          });
        }
      } catch (error) {
        return new Promise((reject) => {
          reject(error.response);
        });
      } finally {
        this.loading = false;
      }
    },

    async login(formData) {
      this.loading = true;
      try {
        const response = await apiClient.post("/api/auth/login", formData);
        if (response.status === 200) {
          this.token = response.data.token;
          this.user = response.data.user;
          return Promise.resolve(response);
        }
      } catch (error) {
        return Promise.reject(error.response);
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        const response = await apiClient.post("/api/logout");
        if (response.status === 200) {
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response.data);
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
