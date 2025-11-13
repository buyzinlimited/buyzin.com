<script setup>
import { useRoute } from "vue-router";
import ProductCard from "@/components/ProductCard.vue";
import { useCollectionStore } from "@/stores/collection";

const collectionStore = useCollectionStore();

const route = useRoute();

const collection = ref(null);
const products = ref(null);

const loadCollection = async () => {
  const response = await collectionStore.show(route.params.slug);
  products.value = response.data.data;
  collection.value = response.data.collection;
};

onMounted(() => {
  loadCollection();
});
</script>

<template>
  <div class="container mx-auto py-6">
    <!-- Loaded content -->
    <template v-if="collection">
      <div class="mb-6">
        <NuxtImg
          v-if="collection.banner_url"
          :src="collection.banner_url"
          :alt="collection.name"
          class="rounded-xl w-full object-cover"
        />
      </div>

      <div class="bg-white px-4 py-2">
        <h1 class="text-3xl font-bold text-heading">
          {{ collection.name }}
        </h1>
        <p class="text-body mb-4">{{ collection.description }}</p>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>

      <div v-if="!products?.length" class="text-center py-10 text-gray-500">
        No products found in this collection.
      </div>
    </template>

    <!-- Error state -->
    <template v-else>
      <div class="text-center text-gray-500 py-10">
        Collection not found or removed.
      </div>
    </template>
  </div>
</template>
