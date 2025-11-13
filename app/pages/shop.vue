<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "@/stores/product";

const productStore = useProductStore();

const filters = ref([]);
const data = ref([]);

const loadProducts = async () => {
  const response = await productStore.index();
  data.value = response.data;
  filters.value = response.filters;
};

onMounted(() => {
  loadProducts();
});
</script>

<template>
  <div class="container mx-auto my-6">
    <div class="flex items-start gap-6">
      <!-- Sidebar -->
      <aside class="w-80 p-4 bg-white rounded-xl space-y-4">
        <!-- Categories -->
        <div class="categories">
          <h3 class="font-semibold mb-2">Categories</h3>
          <div v-for="category in filters.categories">
            <label class="inline-flex items-center">
              <input type="checkbox" class="mr-2 accent-primary" />
              {{ category.name }}
            </label>
          </div>
        </div>

        <!-- Brands -->
        <div class="brands">
          <h3 class="font-semibold mb-2">Brands</h3>
          <div v-for="brand in filters.brands">
            <label class="inline-flex items-center">
              <input type="checkbox" class="mr-2 accent-primary" />
              {{ brand.name }}
            </label>
          </div>
        </div>

        <!-- Price Range -->
        <div class="price__range">
          <h3 class="font-semibold mb-2">Price Range</h3>
          <div class="flex items-center space-x-2">
            <input type="number" class="form__control" />
            <span>-</span>
            <input type="number" class="form__control" />
          </div>
        </div>

        <!-- Ratings -->
        <div class="ratings">
          <h3 class="font-semibold mb-2">Ratings</h3>
          <div class="space-y-1">
            <label
              v-for="rating in filters.ratings"
              :key="rating"
              class="inline-flex items-center text-sm"
            >
              <input
                type="checkbox"
                class="mr-2 accent-primary"
                :value="rating"
              />
              <span class="flex">
                <template v-for="starIndex in 5" :key="starIndex">
                  <IconsIconStarFill
                    v-if="starIndex <= rating"
                    class="h-4 w-4 text-yellow-400"
                  />
                  <IconsIconStar v-else class="h-4 w-4 text-gray-300" />
                </template>
              </span>
              <span class="ml-1 text-gray-700">{{ rating }} & up</span>
            </label>
          </div>
        </div>
      </aside>

      <!-- Products -->
      <div class="w-full bg-white p-4 rounded-xl">
        <div class="flex justify-between items-center mb-4">
          <span class="text-sm text-gray-600">Showing 66 results</span>
          <select class="border rounded px-2 py-1 text-sm">
            <option value="default">Default sorting</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        <!-- Product Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ProductCard
            v-for="product in data"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>
