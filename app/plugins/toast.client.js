export default defineNuxtPlugin((nuxtApp) => {
  const toast = useToast();

  const showToast = (message, type = "info", duration = 4000) => {
    const config = {
      description: message,
      duration,
    };

    switch (type) {
      case "success":
        config.title = "Success";
        config.color = "green";
        config.icon = "i-heroicons-check-circle";
        break;
      case "error":
        config.title = "Error";
        config.color = "red";
        config.icon = "i-heroicons-x-circle";
        break;
      case "warning":
        config.title = "Warning";
        config.color = "yellow";
        config.icon = "i-heroicons-exclamation-triangle";
        break;
      default:
        config.title = "Info";
        config.color = "blue";
        config.icon = "i-heroicons-information-circle";
        break;
    }

    toast.add(config);
  };

  // Provide globally
  nuxtApp.provide("toast", showToast);

  // Global window access (for stores/composables)
  if (process.client) {
    window.$toast = showToast;
  }
});
