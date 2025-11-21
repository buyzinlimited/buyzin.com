<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const categoryStore = useCategoryStore();
const categories = ref([]);

const loadCategories = async () => {
  const response = await categoryStore.getCategories();
  categories.value = response.data;
};

onMounted(() => {
  loadCategories();
});
</script>

<template>
  <Transition name="slide-fade">
    <aside v-if="open" class="fixed top-0 inset-x-0 z-40 bg-white">
      <div
        class="flex items-center justify-between px-4 h-16 border-b shrink-0"
      >
        <NuxtLink to="/" class="block py-2">
          <img src="/logo.svg" class="h-12 w-auto" />
        </NuxtLink>

        <!-- Close Button -->
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-x"
          @click="emit('close')"
        />
      </div>

      <nav class="overflow-y-auto h-[calc(100dvh-64px)] px-2 py-4">
        <ul class="space-y-2">
          <NavigationItem
            v-for="category in categories"
            :key="category.id"
            :item="category"
          />
        </ul>
      </nav>
    </aside>
  </Transition>
</template>

<style scoped></style>
