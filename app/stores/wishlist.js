import { defineStore } from "pinia";
import apiClient from "~/utils/axios";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    loading: false,
    count: 0,
    items: {},
  }),

  getters: {},

  actions: {
    async addItem(product) {
      this.loading = product.id;

      try {
        const response = await apiClient.post("/api/wishlist", {
          product_id: product.id,
        });
        if (response.status === 201) {
          toast.success("Added to wishlist!");
          await this.getWishlist();
        }
      } catch (error) {
        if (error.response) {
          toast.error("Something went wrong!");
        }
      } finally {
        this.loading = false;
      }
    },

    async getWishlist() {
      try {
        const response = await apiClient.get("/api/wishlist");

        if (response.status === 200) {
          this.count = response.data.count;
          this.items = response.data.data;
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        }
      }
    },
  },
});
