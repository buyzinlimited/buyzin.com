<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const query = computed(() => route.query.q?.toLowerCase() || "");

// Dummy products
const products = ref([
  {
    id: 1,
    name: "Redmi Note 13 Pro | Xiaomi Global",
    price_formatted: "৳27,000",
    image_url: "https://via.placeholder.com/300x300?text=Redmi+Note+13+Pro",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    price_formatted: "৳120,000",
    image_url: "https://via.placeholder.com/300x300?text=Galaxy+S23+Ultra",
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max",
    price_formatted: "৳180,000",
    image_url: "https://via.placeholder.com/300x300?text=iPhone+15+Pro+Max",
  },
  {
    id: 4,
    name: "Realme 12+ 5G",
    price_formatted: "৳35,000",
    image_url: "https://via.placeholder.com/300x300?text=Realme+12+5G",
  },
  {
    id: 5,
    name: "MacBook Air M3 2025",
    price_formatted: "৳165,000",
    image_url: "https://via.placeholder.com/300x300?text=MacBook+Air+M3",
  },
]);

// Filtered products based on search query
const filteredProducts = computed(() =>
  query.value
    ? products.value.filter((p) => p.name.toLowerCase().includes(query.value))
    : products.value
);
</script>

<template>
  <section class="container mx-auto p-4">
    <h1 class="text-lg font-semibold mb-4">
      Search Results for "{{ route.query.q || "All Products" }}"
    </h1>

    <div
      v-if="!filteredProducts.length"
      class="text-gray-500 text-center py-10"
    >
      No products found.
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="border rounded-lg p-3 hover:shadow-md transition"
      >
        <img
          :src="product.image_url"
          :alt="product.name"
          class="w-full h-40 object-cover rounded"
        />
        <h3 class="mt-2 text-sm font-medium truncate">
          {{ product.name }}
        </h3>
        <p class="text-primary font-semibold text-sm">
          {{ product.price_formatted }}
        </p>
      </div>
    </div>
  </section>
</template>
