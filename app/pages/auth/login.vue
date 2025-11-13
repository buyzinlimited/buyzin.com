<script setup>
const authStore = useAuthStore();

definePageMeta({
  middleware: "guest",
});

const form = reactive({
  phone: "01911742233",
  password: "password",
});

const errors = ref([]);

const login = async () => {
  const response = await authStore.login(form);
  console.log(response.status);
  if (response.status === 200) {
    navigateTo("/profile");
  } else {
    errors.value = response.errors;
  }
};
</script>

<template>
  <div class="bg-gray-50 py-8">
    <div class="flex flex-col items-center justify-center">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center mb-6 text-2xl font-semibold">
        <img class="w-auto h-16" src="/logo.svg" alt="logo" />
      </NuxtLink>

      <div class="w-full bg-white rounded-lg sm:max-w-md">
        <div class="p-6 space-y-4 sm:p-8">
          <!-- Form Title -->
          <h1 class="text-2xl font-bold text-heading md:text-3xl">
            Welcome Back!
          </h1>
          <!-- Form Subtitle -->
          <p class="text-sm text-gray-500 md:text-base">
            Sign in to access your account and manage your orders.
          </p>

          <form @submit.prevent="login" class="space-y-4 md:space-y-6 mt-4">
            <!-- Phone Number -->
            <div class="mb-3">
              <BaseInput
                v-model.trim="form.phone"
                label="Phone Number"
                placeholder="Enter Phone number"
              />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <BaseInput
                type="password"
                v-model.trim="form.password"
                label="Enter Password"
                placeholder="Enter Password"
              />
            </div>

            <!-- Remember & Forgot -->
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    checked
                    aria-describedby="remember"
                    type="checkbox"
                    class="accent-primary w-4 h-4 border border-border rounded"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember">Remember me</label>
                </div>
              </div>
              <NuxtLink
                to="/auth/forgot"
                class="text-sm font-medium text-primary-600 hover:underline"
                >Forgot password?</NuxtLink
              >
            </div>

            <!-- Login Button -->
            <BaseButton class="w-full" :loading="authStore.loading">
              Log in
            </BaseButton>

            <!-- Register Link -->
            <p class="text-sm font-light text-center">
              Don’t have an account yet?
              <NuxtLink
                to="/auth/register"
                class="font-medium text-primary hover:underline"
                >Register</NuxtLink
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
