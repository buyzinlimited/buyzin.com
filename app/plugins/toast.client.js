import { ref } from "vue";

export default defineNuxtPlugin((nuxtApp) => {
  const toasts = ref([]);

  const toast = (message, type = "success", duration = 3000) => {
    const id = Date.now();
    toasts.value.push({ id, message, type });

    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, duration);
  };

  // Provide globally
  nuxtApp.provide("toast", toast);
  nuxtApp.provide("toasts", toasts);

  // Pinia plugin: add $toast to all stores
  nuxtApp.$pinia?.use(({ store }) => {
    store.$toast = toast;
  });
});
