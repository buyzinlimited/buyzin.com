<script setup>
const user = ref({
  joined: "2023-02-15",
  avatar: "/avatar.png",
  orders: {
    total: 32,
    pending: 3,
    completed: 28,
    cancelled: 1,
  },
});
</script>

<template>
  <main class="max-w-7xl mx-auto py-4">
    <div class="container mx-auto px-4">
      <div
        class="relative bg-[url(/bg-profile.jpg)] bg-cover rounded-xl text-white p-6 flex flex-col md:flex-row items-center md:items-end justify-between gap-6"
      >
        <div class="flex items-center gap-4">
          <div class="relative">
            <img
              :src="user.avatar"
              alt="Profile"
              class="w-24 h-24 rounded-full object-cover border-4 border-white"
            />
            <button
              class="absolute bottom-0 right-0 bg-white text-primary p-1.5 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828H9v-2.828z"
                />
              </svg>
            </button>
          </div>
          <div>
            <h1 class="text-2xl font-bold">{{ user.name }}</h1>
            <p class="text-sm text-white/80">{{ user.email }}</p>
            <p class="text-sm text-white/80">{{ user.phone }}</p>
          </div>
        </div>

        <div class="text-right">
          <p class="text-sm text-white/70">Member since</p>
          <p class="font-semibold">
            {{ new Date(user.joined).toDateString() }}
          </p>
        </div>
      </div>

      <!-- Profile Content -->
      <div class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left: Overview Cards -->
        <div class="space-y-6">
          <!-- Order Summary -->
          <div class="bg-white p-6 rounded-2xl">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 rounded-xl p-4 text-center">
                <p class="text-sm text-gray-500">Total Orders</p>
                <p class="text-xl font-bold text-primary">
                  {{ user.orders.total }}
                </p>
              </div>
              <div class="bg-gray-50 rounded-xl p-4 text-center">
                <p class="text-sm text-gray-500">Pending</p>
                <p class="text-xl font-bold text-yellow-500">
                  {{ user.orders.pending }}
                </p>
              </div>
              <div class="bg-gray-50 rounded-xl p-4 text-center">
                <p class="text-sm text-gray-500">Completed</p>
                <p class="text-xl font-bold text-green-600">
                  {{ user.orders.completed }}
                </p>
              </div>
              <div class="bg-gray-50 rounded-xl p-4 text-center">
                <p class="text-sm text-gray-500">Cancelled</p>
                <p class="text-xl font-bold text-red-500">
                  {{ user.orders.cancelled }}
                </p>
              </div>
            </div>
          </div>

          <!-- Address -->
          <div class="bg-white p-6 rounded-2xl">
            <h2 class="text-lg font-semibold text-gray-800 mb-3">
              Shipping Address
            </h2>
            <p>Daniel Robinson</p>
            <p>1418 River Drive, Suite 35 Cottonhall, CA 9622</p>
            <p>United States</p>
            <p class="mt-6">sale@zenmart.com</p>
            <p>+3 8493 92 932 021</p>
          </div>
        </div>

        <!-- content -->
        <div class="lg:col-span-2 bg-white rounded-2xl p-6">
          <slot />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
