import { defineStore } from "pinia";
import apiClient from "~/utils/axios";

export const useCheckoutStore = defineStore("checkout", {
  state: () => ({
    loading: false,
    errors: [],
  }),

  getters: {},

  actions: {
    async process(payload) {
      this.loading = true;
      try {
        const response = await apiClient.post("/api/checkout/process", payload);
        if (response.status === 200) {
          console.log(response);
          toast.success(response.data.message);
          setTimeout(() => {
            window.location.href = response.data.redirect_url;
          }, 3000);
        }
      } catch (error) {
        if (error.response) {
          this.errors = error.response.errors;
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
