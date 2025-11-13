<script setup>
import { useAppStore } from "@/stores/app";
import SeoMeta from "~/components/SeoMeta.vue";
const appStore = useAppStore();

const home = ref([]);

const loadHome = async () => {
  const response = await appStore.getHome();
  home.value = response;
};

onMounted(() => {
  loadHome();
});

const items = [
  "https://picsum.photos/640/640?random=1",
  "https://picsum.photos/640/640?random=2",
  "https://picsum.photos/640/640?random=3",
  "https://picsum.photos/640/640?random=4",
  "https://picsum.photos/640/640?random=5",
  "https://picsum.photos/640/640?random=6",
];
</script>

<template>
  <SeoMeta
    title="Buyzin | Shop Smart. Live Easy. | Best Deals on Fashion, Gadgets & Lifestyle in Bangladesh"
    description="Shop online with Buyzin for 100% authentic products, fast delivery & easy returns across Bangladesh. Find the best deals on fashion, electronics, home goods & more. Shop Smart. Live Easy."
    keywords="ecommerce, online shopping, buy online, fashion, gadgets, electronics, Bangladesh, best price, quick delivery, Buyzin"
  />
  <main class="main">
    <!-- Slider section -->
    <section>
      <div v-if="home.banners" class="w-full h-full">
        <UCarousel
          v-slot="{ item }"
          loop
          fade
          dots
          :items="home.banners"
          :autoplay="{ delay: 2000 }"
          class="w-full mx-auto"
        >
          <NuxtLink :to="item.target_url">
            <img
              :src="item.image_url"
              :alt="item.name"
              class="rounded-lg w-full object-cover z-10"
            />
          </NuxtLink>
        </UCarousel>
      </div>
      <!-- Loading skeleton -->
      <div v-else role="status" class="animate-pulse space-y-4">
        <h3 class="h-32 md:h-96 bg-gray-200 rounded w-full"></h3>
        <p class="h-8 bg-gray-200 rounded-full"></p>
        <p class="h-4 bg-gray-200 rounded-full"></p>
      </div>
    </section>

    <!-- Features section -->
    <section class="py-10">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <template v-if="appStore.loading">
            <div v-for="n in 4" :key="n" class="flex items-center gap-2">
              <div class="skeleton w-12 h-12 rounded-full"></div>
              <div class="flex-1">
                <div class="skeleton__text"></div>
                <div class="skeleton__text w-1/2"></div>
              </div>
            </div>
          </template>
          <template v-else>
            <div
              v-for="feature in home.features"
              class="flex items-center justify-evenly gap-2"
            >
              <img :src="feature.icon_url" alt="Payment" class="h-12 w-12" />
              <div class="w-full">
                <h4 class="font-semibold text-base">{{ feature.title }}</h4>
                <p class="text-sm text-gray-500">{{ feature.subtitle }}</p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Shop By Categories -->
    <section class="py-4">
      <div class="container mx-auto">
        <div class="flex flex-wrap items-center justify-between mb-4">
          <div class="block">
            <h2 class="text-2xl font-bold text-gray-800">Shop By Categories</h2>
            <span class="text-gray-600 text-sm mt-1">
              Discover our latest arrivals with freshly updated stock in every
              category.</span
            >
          </div>
          <NuxtLink to="/shop" class="text-primary hover:underline text-sm"
            >See all</NuxtLink
          >
        </div>

        <div
          class="grid grid-cols-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4"
        >
          <template v-if="appStore.loading">
            <div
              v-for="n in 8"
              :key="n"
              class="bg-white rounded-xl p-4 shadow animate-pulse"
            >
              <div class="skeleton-img mb-4"></div>
              <div class="skeleton__text"></div>
              <div class="skeleton__text w-1/2"></div>
            </div>
          </template>
          <template v-else>
            <NuxtLink
              v-for="category in home.categories"
              :key="category.id"
              :to="`/shop?categories=${category.slug}`"
              class="bg-white flex flex-col items-center text-center border rounded-lg p-4 hover:shadow-md transition"
            >
              <NuxtImg
                :src="category.image_url"
                alt="Category"
                class="w-16 h-16 object-contain mb-2"
              />
              <span class="text-sm font-medium text-gray-800">{{
                category.name
              }}</span>
            </NuxtLink>
          </template>
        </div>
      </div>
    </section>

    <!-- Collection section -->
    <section
      v-for="collection in home.collections"
      :key="collection.id"
      class="py-4"
    >
      <div class="container mx-auto">
        <div class="my-6">
          <div class="flex flex-wrap items-center justify-between mb-4">
            <div class="block">
              <h2 class="text-2xl font-bold text-gray-800">
                {{ collection.name }}
              </h2>
              <span class="text-gray-600 text-sm mt-1">
                {{ collection.description }}</span
              >
            </div>
            <NuxtLink
              :to="`/collections/${collection.slug}`"
              class="text-primary hover:underline text-sm"
              >See all</NuxtLink
            >
          </div>
          <NuxtLink
            :to="`/collections/${collection.slug}`"
            class="rounded-xl overflow-hidden"
          >
            <NuxtImg
              :src="collection.banner_url"
              :alt="collection.name"
              class="w-full h-auto object-cover rounded-xl"
            />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <template v-if="appStore.loading">
            <div
              v-for="n in 5"
              :key="n"
              class="bg-white rounded-xl p-4 shadow animate-pulse"
            >
              <div class="skeleton-img mb-4"></div>
              <div class="skeleton__text"></div>
              <div class="skeleton__text w-1/2"></div>
            </div>
          </template>
          <template v-else>
            <div v-for="product in collection.products" :key="product.id">
              <ProductCard :product="product" />
            </div>
          </template>
        </div>
      </div>
    </section>

    <section class="py-4">
      <div class="container mx-auto">
        <div class="flex flex-wrap items-center justify-between mb-4">
          <div class="block">
            <h2 class="text-2xl font-bold text-gray-800">Top Brands</h2>
            <span class="text-gray-600 text-sm mt-1">
              New products with updated stocks.</span
            >
          </div>
          <NuxtLink
            to="/collections/"
            class="text-primary hover:underline text-sm"
            >See all</NuxtLink
          >
        </div>

        <div
          class="grid grid-cols-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4"
        >
          <!-- Category Card -->
          <div
            v-for="brand in home.brands"
            class="bg-white flex flex-col items-center text-center border rounded-lg p-4 hover:shadow-md transition"
          >
            <img
              :src="brand.logo_url"
              :alt="brand.name"
              class="w-16 h-16 object-contain mb-2"
            />
            <span class="text-sm font-medium text-gray-800">{{
              brand.name
            }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-4">
      <div class="container mx-auto">
        <div class="flex flex-wrap items-center justify-between mb-4">
          <div class="block">
            <h2 class="text-2xl font-bold text-gray-800">Best Sellers</h2>
            <span class="text-gray-600 text-sm mt-1">
              10,000+ items sold — most popular right now!</span
            >
          </div>
          <NuxtLink
            to="/collections/"
            class="text-primary hover:underline text-sm"
            >See all</NuxtLink
          >
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <ProductCard
            v-for="(product, index) in home.top_sales"
            :key="index"
            :product="product"
          />
        </div>
      </div>
    </section>

    <section class="py-4">
      <div class="container mx-auto">
        <div class="flex flex-wrap items-center justify-between mb-4">
          <div class="block">
            <h2 class="text-2xl font-bold text-gray-800">New Arrivals</h2>
            <span class="text-gray-600 text-sm mt-1">
              Discover the latest products in store</span
            >
          </div>
          <NuxtLink
            to="/collections/"
            class="text-primary hover:underline text-sm"
            >See all</NuxtLink
          >
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <ProductCard
            v-for="(product, index) in home.trending"
            :key="index"
            :product="product"
          />
        </div>

        <div class="flex items-center justify-center py-10">
          <NuxtLink to="/shop" class="base__button">Load more</NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
