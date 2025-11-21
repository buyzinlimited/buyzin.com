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
  <SeoMeta
    :title="collection?.meta_title"
    :description="collection?.meta_description"
    :keywords="collection?.meta_keywords"
    :image="collection?.banner_url"
  />
  <main class="max-w-7xl mx-auto px-4 py-6">
    <template v-if="collection === null">
      <div class="container mx-auto py-6 space-y-6">
        <div class="h-48 w-full bg-gray-200 rounded-xl animate-pulse"></div>
        <div class="bg-white px-4 py-2 space-y-2">
          <div class="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div
            v-for="i in 10"
            :key="i"
            class="h-48 bg-gray-200 rounded-lg animate-pulse"
          ></div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="w-full space-y-4">
        <NuxtImg
          v-if="collection.banner_url"
          :src="collection.banner_url"
          :alt="collection.name"
          class="rounded-xl w-full object-cover"
        />

        <div class="bg-white rounded-xl px-4 py-6">
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
      </div>
    </template>
  </main>
</template>
