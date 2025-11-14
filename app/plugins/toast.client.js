export default defineNuxtPlugin((nuxtApp) => {
  const toast = useToast();

  // Inject globally as globalThis.toast
  if (!globalThis.toast) {
    globalThis.toast = {
      success(message, duration = 4000) {
        toast.add({
          title: "Success",
          description: message,
          color: "primary",
          variant: "outline",
          icon: "i-lucide-check-circle",
          duration,
        });
      },
      error(message, duration = 4000) {
        toast.add({
          title: "Error",
          description: message,
          color: "red",
          variant: "outline",
          icon: "i-lucide-x-circle",
          duration,
        });
      },
      warning(message, duration = 4000) {
        toast.add({
          title: "Warning",
          description: message,
          color: "yellow",
          variant: "outline",
          icon: "i-lucide-alert-triangle",
          duration,
        });
      },
      info(message, duration = 4000) {
        toast.add({
          title: "Info",
          description: message,
          color: "blue",
          variant: "outline",
          icon: "i-lucide-info",
          duration,
        });
      },
    };
  }
});
