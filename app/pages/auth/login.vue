<script setup>
const authStore = useAuthStore();
const { errors } = storeToRefs(authStore);

definePageMeta({
  middleware: "guest",
});

const form = reactive({
  phone: "01911742233",
  password: "password",
});

const submit = async () => {
  await authStore.login(form);
};
</script>

<template>
  <main class="bg-background min-h-screen px-6 py-12">
    <Head>
      <Title>Login - Access Your Account</Title>
      <Meta
        name="description"
        content="Securely log in to your account to access courses, track progress, and manage your profile settings."
      />
    </Head>

    <div
      class="w-full max-w-5xl mx-auto bg-white rounded-lg grid grid-cols-1 md:grid-cols-2"
    >
      <!-- Left Section -->
      <div class="hidden md:flex flex-col justify-center items-center p-10">
        <img src="/auth.jpg" alt="Illustration" class="mb-6" />
        <h2 class="text-2xl font-bold text-center mb-3">
          Show your skills be an innovator
        </h2>
        <p class="text-gray-500 text-center">
          Seize the moment and help shape the future by starting a career in
          blockchain now
        </p>
        <div class="flex justify-center mt-6 space-x-2">
          <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
          <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
          <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
          <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
        </div>
      </div>
      <div class="px-8 py-10">
        <h2 class="text-2xl font-bold mb-2">Sign In</h2>
        <p class="text-gray-500 mb-6">Welcome back, you've been missed!</p>
        <form @submit.prevent="submit">
          <BaseInput
            v-model="form.phone"
            label="Phone Number"
            placeholder="Enter your phone"
            :error="errors.phone"
          />

          <BaseInput
            v-model="form.password"
            label="Password"
            type="password"
            placeholder="Enter password"
            :error="errors.password"
          />

          <div class="flex items-center justify-between mb-6">
            <label class="flex items-center space-x-2">
              <input type="checkbox" class="accent-emerald-500" />
              <span class="text-sm text-gray-600">Remember Me</span>
            </label>
            <RouterLink
              to="/auth/forgot"
              class="text-sm text-blue-600 hover:underline"
              >Forget Password?</RouterLink
            >
          </div>

          <BaseButton :loading="authStore.loading" class="w-full"
            >Submit</BaseButton
          >
        </form>
        <p class="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?
          <NuxtLink
            to="/auth/register"
            class="font-semibold text-primary hover:text-opacity-90"
            >Sign up now!</NuxtLink
          >
        </p>
      </div>
    </div>
  </main>
</template>
