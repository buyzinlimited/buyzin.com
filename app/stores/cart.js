import { defineStore } from "pinia";
import apiClient from "~/utils/axios";

export const useCartStore = defineStore("cart", {
  state: () => ({
    loading: false,
    errors: {},
    token: "",
    items: [],
    coupon: null,
    discountAmount: 0,
    shippingCost: 0, // default shipping cost
    taxRate: 0.05, // 5% VAT
  }),

  persist: true,

  getters: {
    subtotal: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),

    tax() {
      return this.subtotal * this.taxRate;
    },

    discount() {
      return this.discountAmount;
    },

    shipping() {
      return this.shippingCost;
    },

    total() {
      return this.subtotal - this.discount + this.shipping + this.tax;
    },

    itemCount: (state) =>
      state.items.reduce((count, item) => count + item.quantity, 0),
  },

  actions: {
    /**
     * Add item to cart
     */
    add(product) {
      const existing = this.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        this.items.push({
          ...product,
          quantity: 1,
        });
      }
      this.coupon = null;
      this.discountAmount = 0;
    },

    /**
     * Increase item quantity
     */
    increase(itemId) {
      const item = this.items.find((i) => i.id === itemId);
      if (item) item.quantity++;
      this.coupon = null;
      this.discountAmount = 0;
    },

    /**
     * Decrease item quantity
     */
    decrease(itemId) {
      const item = this.items.find((i) => i.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else {
        this.remove(itemId);
      }
      this.coupon = null;
      this.discountAmount = 0;
    },

    /**
     * Remove item
     */
    remove(itemId) {
      this.items = this.items.filter((i) => i.id !== itemId);
      this.coupon = null;
      this.discountAmount = 0;
    },

    /**
     * Clear cart
     */
    clear() {
      this.items = [];
      this.coupon = null;
      this.discountAmount = 0;
    },

    /**
     * Apply coupon
     */
    async couponApply(code) {
      this.loading = true;

      try {
        const response = await apiClient.post("/api/coupon/apply", {
          code,
          cart: this.items,
        });

        if (response.status === 200) {
          this.coupon = response.data.coupon || { code };
          this.discountAmount = response.data.discount;
          $toast("Coupon applied successfully!", "success");
        }
      } catch (error) {
        this.errors = error.response.data;
        $toast("Invalid coupon code", "error");
      } finally {
        this.loading = false;
      }
    },
  },
});
