import { defineStore } from "pinia";
import apiClient from "~/utils/axios";

export const useOrderStore = defineStore("order", {
  state: () => ({
    loading: false,
    errors: [],
    orders: [],
    order: {},
  }),

  getters: {},

  actions: {
    async all() {
      this.loading = true;
      try {
        const response = await apiClient.get("/api/orders");
        if (response.status === 200) {
          return Promise.resolve(response);
        }
      } catch (error) {
        return Promise.reject(error.response);
      } finally {
        this.loading = false;
      }
    },

    async store(form) {
      this.loading = true;
      try {
        const response = await apiClient.post("/api/orders/store", form);

        if (response.status === 201) {
          this.orders = response.data;
          this.$toast(response.data.message, "success");
          return navigateTo(`/order/success?order_number=ord-fgjg6879796`);
        } else {
          return navigateTo("/order/failed");
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response);
        }
      } finally {
        this.loading = false;
      }
    },

    async tracking(order_number) {
      try {
        const response = await apiClient.get(
          `api/orders/${order_number}/tracking`
        );

        if (response.status === 200) {
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response);
        }
      }
    },
  },
});
