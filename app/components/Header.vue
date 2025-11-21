<script setup>
import { useAuthStore } from "@/stores/auth";
import { useCollectionStore } from "@/stores/collection";

const authStore = useAuthStore();
const cartStore = useCartStore();
const collectionStore = useCollectionStore();

const { user } = storeToRefs(authStore);

const collections = ref([]);
const profileRef = ref(null);
const showProfileDropdown = ref(false);
const isOpen = ref(false);

// Toggle mobile nav
const toggleNavigation = () => {
  isOpen.value = !isOpen.value;
};

// Toggle profile dropdown
const toggleProfileDropdown = () => {
  showProfileDropdown.value = !showProfileDropdown.value;
};

// Close profile or category dropdowns if clicking outside
const onClickOutside = (event) => {
  if (profileRef.value && !profileRef.value.contains(event.target)) {
    showProfileDropdown.value = false;
  }
};

// Load categories from store
const loadCollections = async () => {
  const response = await collectionStore.index();
  collections.value = response;
};

onMounted(() => {
  document.addEventListener("click", onClickOutside);
  loadCollections();
});

onUnmounted(() => {
  document.removeEventListener("click", onClickOutside);
});

const logout = async () => {
  if (confirm("Are you sure you went to logout?")) {
    await authStore.logout();
  }
};
</script>

<template>
  <header class="sticky top-0 z-50 bg-white">
    <!-- Top Section -->
    <div class="max-w-7xl mx-auto px-4 py-2.5">
      <div class="flex items-center justify-between">
        <!-- Mobile Navigation  -->
        <MobileNavigation class="block md:hidden" />

        <!-- Logo -->
        <div class="flex-none">
          <NuxtLink to="/" class="block">
            <img
              src="/logo.svg"
              alt="logo"
              class="h-12 w-auto object-contain"
            />
          </NuxtLink>
        </div>

        <!-- Search bar -->
        <div class="hidden lg:block grow max-w-sm mx-12">
          <div class="relative w-full mx-auto">
            <div
              class="absolute inset-y-0 left-3 flex items-center pointer-events-none"
            >
              <icons-icon-search class="size-5 text-gray-400" />
            </div>

            <input
              type="search"
              placeholder="Enter search keywords..."
              class="w-full pl-10 pr-24 py-2.5 rounded-full border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
            />

            <button
              class="absolute right-1.5 top-1.5 bottom-1.5 bg-primary text-white px-5 rounded-full text-sm font-medium hover:bg-primary/90 transition-all duration-200"
            >
              Search
            </button>
          </div>
        </div>

        <!-- Right Icons -->
        <div class="flex items-center space-x-3">
          <!-- Cart -->
          <NuxtLink
            to="/cart"
            class="bg-white border border-border text-primary p-2 rounded-full hover:text-primary/80 relative"
          >
            <IconsIconCart class="size-5" />
            <span
              class="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary rounded-full"
            >
              {{ cartStore.itemCount ?? 0 }}
            </span>
          </NuxtLink>

          <!-- Profile Dropdown -->
          <template v-if="authStore.loggedIn && authStore.user">
            <div ref="profileRef" class="relative">
              <div
                @click="toggleProfileDropdown"
                class="flex items-center gap-2 cursor-pointer"
              >
                <div
                  class="bg-white border border-border text-primary p-2 rounded-full hover:text-primary/80"
                >
                  <IconsIconUser class="size-5" />
                </div>

                <div class="hidden md:flex flex-col text-left">
                  <small class="text-xs">Hello, sign in</small>
                  <span class="font-semibold text-body whitespace-nowrap">
                    Account & Lists
                  </span>
                </div>
                <svg
                  :class="{ 'rotate-180': showProfileDropdown }"
                  class="w-4 h-4 text-gray-500 transition-transform duration-200 hidden md:block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>

              <transition name="fade">
                <nav
                  v-if="showProfileDropdown"
                  class="absolute top-full right-0 mt-2 w-64 rounded-xl border border-border bg-white z-50 shadow-lg"
                >
                  <div
                    class="flex items-center gap-3 border-b border-border px-4 py-2"
                  >
                    <NuxtImg
                      :src="user?.photo_url"
                      :alt="user?.name"
                      class="w-10 h-10 rounded-full border border-border"
                    />
                    <div>
                      <h4 class="text-sm font-semibold text-heading">
                        {{ user?.name }}
                      </h4>
                      <p class="text-xs">
                        {{ user?.email ?? "N/A" }}
                      </p>
                    </div>
                  </div>

                  <ul class="space-y-1 text-sm text-gray-700 px-2 py-4">
                    <li
                      class="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 hover:text-primary cursor-pointer rounded transition"
                    >
                      <IconsIconProfile class="size-5" />
                      <NuxtLink to="/profile">My Profile</NuxtLink>
                    </li>

                    <li
                      class="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 hover:text-primary cursor-pointer rounded transition"
                    >
                      <IconsIconList class="size-5" />
                      <NuxtLink to="/profile/orders">Orders</NuxtLink>
                    </li>

                    <li
                      class="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 hover:text-primary cursor-pointer rounded transition"
                    >
                      <IconsIconLocation class="size-5" />
                      <NuxtLink to="/profile/address">Address</NuxtLink>
                    </li>

                    <li
                      class="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 hover:text-primary cursor-pointer rounded transition"
                    >
                      <IconsIconHeart class="size-5" />
                      <NuxtLink to="/profile/wishlist">Wishlist</NuxtLink>
                    </li>

                    <li
                      class="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 text-red-500 cursor-pointer rounded transition"
                    >
                      <IconsIconLoading
                        v-if="authStore.loading"
                        class="size-5 animate-spin"
                      />
                      <IconsIconLogout v-else class="size-5" />
                      <button
                        @click="logout"
                        class="flex items-center gap-1 disabled:opacity-50"
                      >
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </transition>
            </div>
          </template>

          <!-- Not Logged In -->
          <template v-else>
            <NuxtLink
              to="/auth/login"
              class="flex items-center gap-2 cursor-pointer"
            >
              <div
                class="bg-white border border-border text-primary p-2 rounded-full hover:text-primary/80"
              >
                <IconsIconUser class="size-5" />
              </div>

              <div class="hidden md:flex flex-col text-left">
                <small class="text-xs">Hello, sign in</small>
                <span class="font-semibold text-body whitespace-nowrap">
                  Account & Lists
                </span>
              </div>

              <svg
                class="w-4 h-4 text-gray-500 transition-transform duration-200 hidden md:block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </NuxtLink>
          </template>
        </div>
      </div>

      <!-- Mobile Search -->
      <MobileSearch />
    </div>
  </header>

  <!-- Category Nav -->
  <nav class="hidden md:block border-t border-border bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="overflow-x-auto scrollbar">
        <ul v-if="collections?.data" class="w-full flex items-center gap-2">
          <li
            class="relative group mx-2 transition-all duration-300 ease-in-out"
          >
            <NuxtLink
              to="/"
              class="flex items-center py-2 capitalize transition-all duration-300 ease-in-out"
            >
              <span
                class="font-semibold hover:text-primary transition duration-300"
                >Home</span
              >
            </NuxtLink>
          </li>
          <li
            class="relative group mx-2 transition-all duration-300 ease-in-out"
          >
            <NuxtLink
              to="/shop"
              class="flex items-center py-2 capitalize transition-all duration-300 ease-in-out"
            >
              <span
                class="font-semibold hover:text-primary transition duration-300"
                >Shop</span
              >
            </NuxtLink>
          </li>
          <li
            v-for="collection in collections?.data"
            :key="collection.id"
            class="relative group mx-2 transition-all duration-300 ease-in-out"
          >
            <NuxtLink
              :to="`/collections/${collection.slug}`"
              class="flex items-center py-2 capitalize transition-all duration-300 ease-in-out"
            >
              <span
                class="font-semibold hover:text-primary transition duration-300 whitespace-nowrap"
                >{{ collection.name }}</span
              >
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
