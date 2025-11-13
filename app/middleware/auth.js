import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (authStore.loggedIn === false) {
    return navigateTo("/auth/login", { replace: true });
  }
});
