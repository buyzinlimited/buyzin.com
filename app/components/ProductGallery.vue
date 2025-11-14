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

const hasVideo = computed(() => !!props.product?.video_url);

// Convert video_url to embed URL
const getEmbedUrl = (url) => {
  if (!url) return "";
  const videoId = url.split("v=")[1]?.split("&")[0];
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
};
</script>

<template>
  <div class="block">
    <!-- Main Image -->
    <div
      class="relative w-full aspect-square overflow-hidden bg-gray-100 rounded-lg"
    >
      <NuxtImg
        v-if="mainImage"
        :src="mainImage"
        :alt="product?.name"
        loading="lazy"
        class="w-full h-full object-cover transition-all duration-300"
      />
      <div
        v-if="hasVideo"
        class="absolute inset-0 flex items-center justify-center cursor-pointer"
      >
        <div class="bg-black/50 rounded-full p-4 hover:bg-black/60 transition">
          <UModal>
            <UIcon name="i-lucide-play" class="size-10 text-white" />
            <template #content>
              <div
                class="relative w-full max-w-3xl aspect-video bg-black rounded-lg"
              >
                <iframe
                  :src="getEmbedUrl(product.video_url)"
                  class="w-full h-full"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                  allowfullscreen
                ></iframe>
              </div>
            </template>
          </UModal>
        </div>
      </div>
    </div>

    <!-- Thumbnails -->
    <div class="mt-4" v-if="product?.gallery?.length">
      <ol class="flex space-x-2 overflow-x-auto">
        <li
          v-for="(gallery, index) in product.gallery"
          :key="index"
          @click="setMainImage(gallery)"
          class="size-28 border-2 rounded overflow-hidden cursor-pointer transition-all duration-200"
          :class="{
            'border-primary': mainImage === gallery,
            'border-gray-200': mainImage !== gallery,
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
