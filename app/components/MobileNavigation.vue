<script setup>
const categoryStore = useCategoryStore();
const categories = ref();

const loadCategories = async () => {
  const response = await categoryStore.getCategories();
  categories.value = response.data;
};

onMounted(() => {
  loadCategories();
});

const open = ref(false);
</script>

<template>
  <UDrawer
    direction="left"
    v-model:open="open"
    :dismissible="false"
    :modal="false"
    :handle="false"
  >
    <UButton icon="i-lucide-menu" color="primary" variant="ghost" />

    <template #body>
      <div class="w-full flex items-center justify-between gap-4">
        <NuxtLink to="/" class="block">
          <img
            src="/logo.svg"
            alt="logo"
            loading="lazy"
            class="h-12 w-auto object-contain"
          />
        </NuxtLink>

        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-x"
          @click="open = false"
        />
      </div>

      <nav class="overflow-y-auto scrollbar divide-y w-full bg-white z-40 py-4">
        <ul class="space-y-2 py-2">
          <NavigationItem v-for="cat in categories" :key="cat.id" :item="cat" />
        </ul>

        <!-- Modern Contact Info -->
        <div class="space-y-3 py-2">
          <!-- Phone -->
          <a
            href="tel:+8801700000000"
            class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100"
          >
            <UIcon name="i-lucide-phone" class="size-5 text-primary" />
            <span class="text-gray-800 text-base">+880 1700-000000</span>
          </a>

          <!-- Email -->
          <a
            href="mailto:info@yourstore.com"
            class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100"
          >
            <UIcon name="i-lucide-mail" class="size-5 text-primary" />
            <span class="text-gray-800 text-base">info@yourstore.com</span>
          </a>

          <!-- Address -->
          <div
            class="flex items-start gap-3 px-3 py-2 rounded hover:bg-gray-100"
          >
            <UIcon name="i-lucide-map-pin" class="size-5 text-primary mt-1" />
            <span class="text-gray-800 text-base leading-tight"
              >House #23, Road #7,<br />
              Dhanmondi, Dhaka</span
            >
          </div>
        </div>
      </nav>
    </template>
  </UDrawer>
</template>

<style scoped></style>
