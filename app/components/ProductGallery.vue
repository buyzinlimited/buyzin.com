<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const mainImage = ref("");

// Initialize mainImage when product changes
watch(
  () => props.product,
  (newVal) => {
    if (newVal?.image_url) {
      mainImage.value = newVal.image_url;
    } else if (newVal?.gallery?.length) {
      mainImage.value = newVal.gallery[0];
    } else {
      mainImage.value = "";
    }
  },
  { immediate: true }
);

// Set main image on thumbnail or carousel click
const setMainImage = (img) => {
  mainImage.value = img;
};

// Carousel controls
const onClickPrev = () => {
  if (!props.product?.gallery?.length) return;
  const index = props.product.gallery.indexOf(mainImage.value);
  const prevIndex =
    (index - 1 + props.product.gallery.length) % props.product.gallery.length;
  mainImage.value = props.product.gallery[prevIndex];
};

const onClickNext = () => {
  if (!props.product?.gallery?.length) return;
  const index = props.product.gallery.indexOf(mainImage.value);
  const nextIndex = (index + 1) % props.product.gallery.length;
  mainImage.value = props.product.gallery[nextIndex];
};

// Video
const hasVideo = computed(() => !!props.product?.video_url);
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
        format="webp"
        class="w-full h-full object-cover transition-all duration-300"
      />

      <!-- Video overlay -->
      <div
        v-if="hasVideo"
        class="absolute inset-0 flex items-center justify-center cursor-pointer"
      >
        <div class="bg-black/50 rounded-full p-4 hover:bg-black/60 transition">
          <UModal>
            <UIcon name="i-lucide-play" class="size-10 text-white" />
            <template #content>
              <div class="relative w-full aspect-video bg-black rounded-lg">
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

    <!-- Carousel -->
    <div class="mt-4" v-if="product?.gallery?.length">
      <UCarousel
        v-slot="{ item }"
        :items="product.gallery"
        :prev="{ onClick: onClickPrev }"
        :next="{ onClick: onClickNext }"
        class="w-full mx-auto"
        :ui="{ item: 'basis-1/4' }"
      >
        <img
          :src="item"
          class="rounded cursor-pointer overflow-hidden transition-all duration-200 border-2"
          :class="{
            'border-primary': mainImage === item,
            'border-gray-200': mainImage !== item,
          }"
          @click="setMainImage(item)"
        />
      </UCarousel>
    </div>
  </div>
</template>

<style scoped></style>
