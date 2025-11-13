import apiClient from "~/utils/axios";

export const useReviewStore = defineStore("review", {
  state: () => ({
    loading: false,
    errors: [],
    modal: true,
  }),

  getters: {},

  actions: {
    async getReviews(sku) {
      try {
        const response = await apiClient.get(`/api/products/${sku}/reviews`);
        if (response.status === 200) {
          return Promise.resolve(response);
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response);
        }
      }
    },
  },
});
