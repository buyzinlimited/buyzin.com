<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const query = ref("");
const router = useRouter();

const handleSearch = (e) => {
  e.preventDefault();
  if (!query.value.trim()) return;
  router.push(`/search?query=${encodeURIComponent(query.value.trim())}`);
};
</script>

<template>
  <!-- Mobile Search -->
  <form
    @submit="handleSearch"
    class="relative w-full mx-auto mt-3 block md:hidden"
  >
    <input
      v-model="query"
      type="search"
      placeholder="Search products..."
      class="w-full border border-border rounded py-2.5 pl-4 pr-14 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
    />
    <button
      type="submit"
      class="absolute right-0 top-0 h-full px-4 flex items-center justify-center bg-primary rounded-r hover:bg-primary/90 transition"
    >
      <IconsIconSearch class="size-5 text-white" />
    </button>
  </form>
</template>
