<script setup>
import { useAppStore } from "@/stores/app";
import { tr } from "@nuxt/ui/runtime/locale/index.js";
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

  <main class="max-w-7xl mx-auto px-4 py-4">
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
          <template v-if="home.features">
            <div
              v-for="feature in home.features"
              class="flex items-center justify-evenly gap-4"
            >
              <img
                :src="feature.icon_url"
                alt="Payment"
                class="h-16 w-16 bg-white p-2 rounded"
              />
              <div class="w-full">
                <h4 class="font-semibold text-base">{{ feature.title }}</h4>
                <p class="text-sm text-gray-500">{{ feature.subtitle }}</p>
              </div>
            </div>
          </template>
          <template v-else>
            <div
              v-for="n in 4"
              :key="n"
              class="flex items-center justify-evenly gap-4 animate-pulse"
            >
              <div class="h-16 w-16 bg-gray-200 rounded"></div>

              <div class="w-full space-y-2">
                <div class="h-4 w-1/2 bg-gray-200 rounded"></div>
                <div class="h-3 w-3/4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Shop By Categories -->
    <section class="py-4">
      <div class="container mx-auto">
        <template v-if="home.categories">
          <div class="flex flex-wrap items-center justify-between mb-4">
            <div class="block">
              <h2 class="text-2xl font-bold text-gray-800">
                Shop By Categories
              </h2>
              <span class="text-gray-600 text-sm mt-1">
                Discover our latest arrivals with freshly updated stock in every
                category.</span
              >
            </div>
            <NuxtLink to="/shop" class="text-primary hover:underline text-sm"
              >See all</NuxtLink
            >
          </div>

          <UCarousel
            v-slot="{ item }"
            loop
            :autoplay="{ delay: 2000 }"
            :items="home.categories"
            :ui="{ item: 'basis-1/3 md:basis-1/8' }"
          >
            <NuxtLink
              :key="item.id"
              :to="`/shop?categories=${item.slug}`"
              class="bg-white flex flex-col items-center text-center border rounded-lg p-4 hover:shadow-md transition"
            >
              <NuxtImg
                :src="item.image_url"
                alt="Category"
                class="w-16 h-16 object-contain mb-2"
              />
              <span class="text-sm font-medium">{{ item.name }}</span>
            </NuxtLink>
          </UCarousel>
        </template>

        <template v-else>
          <div class="flex flex-wrap items-center justify-between mb-4">
            <div class="block">
              <div class="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
              <div
                class="h-4 w-72 bg-gray-200 rounded mt-2 animate-pulse"
              ></div>
            </div>
            <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div class="flex gap-3 overflow-hidden">
            <div
              v-for="n in 8"
              :key="n"
              class="basis-1/3 md:basis-1/8 bg-white flex flex-col items-center text-center border rounded-lg p-4"
            >
              <div
                class="w-16 h-16 bg-gray-200 rounded animate-pulse mb-2"
              ></div>
              <div class="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- Collection section -->
    <template v-if="home.collections">
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
            <div v-for="product in collection.products" :key="product.id">
              <ProductCard :product="product" />
            </div>
          </div>
        </div>
      </section>
    </template>

    <template v-else>
      <section v-for="n in 2" :key="n" class="py-4">
        <div class="container mx-auto">
          <!-- Header Skeleton -->
          <div class="my-6">
            <div class="flex flex-wrap items-center justify-between mb-4">
              <div class="block">
                <div class="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                <div
                  class="h-4 w-64 bg-gray-200 rounded mt-2 animate-pulse"
                ></div>
              </div>

              <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <!-- Banner Skeleton -->
            <div
              class="w-full h-40 md:h-56 bg-gray-200 rounded-xl animate-pulse"
            ></div>
          </div>

          <!-- Product Grid Skeleton -->
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div v-for="i in 5" :key="i" class="border rounded-xl p-2 bg-white">
              <div
                class="w-full h-28 md:h-32 bg-gray-200 rounded animate-pulse mb-2"
              ></div>

              <div
                class="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1"
              ></div>
              <div class="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <section class="py-4">
      <div class="container mx-auto">
        <template v-if="home.brands">
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

          <UCarousel
            v-slot="{ item }"
            loop
            :autoplay="{ delay: 2000 }"
            :items="home.brands"
            :ui="{ item: 'basis-1/3 md:basis-1/10' }"
          >
            <div
              class="bg-white flex flex-col items-center text-center border rounded-lg p-2 hover:shadow-md transition"
            >
              <img
                :src="item.logo_url"
                :alt="item.name"
                class="w-20 h-20 object-contain mb-2"
              />
              <span class="text-sm font-medium">{{ item.name }}</span>
            </div>
          </UCarousel>
        </template>
        <template v-else>
          <!-- Header Skeleton -->
          <div class="flex flex-wrap items-center justify-between mb-4">
            <div class="block">
              <div class="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
              <div
                class="h-4 w-64 bg-gray-200 rounded mt-2 animate-pulse"
              ></div>
            </div>
            <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <!-- Brand Grid Skeleton -->
          <div
            class="grid grid-cols-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4"
          >
            <div
              v-for="i in 10"
              :key="i"
              class="bg-white flex flex-col items-center text-center border rounded-lg p-4"
            >
              <div
                class="w-16 h-16 bg-gray-200 rounded-full mb-2 animate-pulse"
              ></div>
              <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </template>
      </div>
    </section>

    <section class="py-4">
      <div class="container mx-auto">
        <template v-if="home.top_sales">
          <div class="flex flex-wrap items-center justify-between mb-4">
            <div class="block">
              <h2 class="text-2xl font-bold text-gray-800">Best Sellers</h2>
              <span class="text-gray-600 text-sm mt-1">
                10,000+ items sold — most popular right now!</span
              >
            </div>
            <NuxtLink to="/shop" class="text-primary hover:underline text-sm"
              >See all</NuxtLink
            >
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <ProductCard
              v-for="(product, index) in home.top_sales"
              :key="index"
              :product="product"
            />
          </div>
        </template>
        <template v-else>
          <div class="flex flex-wrap items-center justify-between mb-4">
            <div class="block">
              <div class="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div
                class="h-4 w-64 bg-gray-200 rounded mt-2 animate-pulse"
              ></div>
            </div>
            <div class="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div
              v-for="i in 10"
              :key="i"
              class="border rounded-lg p-4 bg-white animate-pulse"
            >
              <div class="w-full h-40 bg-gray-200 rounded mb-4"></div>
              <div class="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
              <div class="h-4 w-1/2 bg-gray-200 rounded"></div>
            </div>
          </div>
        </template>
      </div>
    </section>

    <section class="py-4">
      <div class="container mx-auto">
        <template v-if="home.trending">
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
        </template>
        <template v-else>
          <div class="flex flex-wrap items-center justify-between mb-4">
            <div class="block">
              <div class="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div
                class="h-4 w-64 bg-gray-200 rounded mt-2 animate-pulse"
              ></div>
            </div>
            <div class="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div
              v-for="i in 10"
              :key="i"
              class="border rounded-lg p-4 bg-white animate-pulse"
            >
              <div class="w-full h-40 bg-gray-200 rounded mb-4"></div>
              <div class="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
              <div class="h-4 w-1/2 bg-gray-200 rounded"></div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
