export const useReviewStore = defineStore("review", {
  state: () => ({
    loading: false,
    errors: [],
    modal: true,
  }),

  getters: {},

  actions: {
    store() {
      this.count++;
    },
  },
});
