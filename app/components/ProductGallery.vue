<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const mainImage = ref("");

watch(
  () => props.product,
  (newVal) => {
    if (newVal?.image_url) {
      mainImage.value = newVal.image_url;
    }
  },
  { immediate: true }
);

const setMainImage = (img) => {
  mainImage.value = img;
};
</script>

<template>
  <div class="relative">
    <!-- Main Image -->
    <div class="w-full aspect-square overflow-hidden bg-gray-100 rounded-lg">
      <NuxtImg
        v-if="mainImage"
        :src="mainImage"
        :alt="product?.name"
        loading="lazy"
        class="w-full h-full object-cover transition-all duration-300"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center text-gray-400"
      >
        Loading image...
      </div>
    </div>

    <!-- Thumbnails -->
    <div class="mt-4" v-if="product?.gallery?.length">
      <ol class="flex space-x-2 overflow-x-auto">
        <li
          v-for="(gallery, index) in product.gallery"
          :key="index"
          @click="setMainImage(gallery)"
          class="w-20 h-20 border-2 rounded overflow-hidden cursor-pointer transition-all duration-200"
          :class="{
            'border-primary': mainImage === gallery,
            'border-border': mainImage !== gallery,
          }"
        >
          <img
            :src="gallery"
            :alt="product?.name"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-200 p-2"
          />
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped></style>
