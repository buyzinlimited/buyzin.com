<script setup>
import { useProductStore } from "@/stores/product";
import { useCartStore } from "@/stores/cart";
import Tabs from "~/components/Tabs.vue";

const productStore = useProductStore();
const wishlistStore = useWishlistStore();
const authStore = useAuthStore();
const route = useRoute();
const cartStore = useCartStore();

const showCartDialog = ref(false);
const selectedVariant = ref(null);
const product = ref(null);
const related = ref([]);

const loadProduct = async () => {
  const response = await productStore.getProduct(
    route.params.slug,
    route.params.sku
  );
  product.value = response.data;
  related.value = response.related;
};

// Add to Cart
const addToCart = async () => {
  if (product.value.has_variant && !selectedVariant.value) {
    alert("Please select a variant before adding to cart!");
    return;
  }

  // Choose correct price
  const finalPrice = product.value.has_variant
    ? selectedVariant.value.price
    : product.value.price;

  // Build payload
  const payload = {
    id: product.value.id,
    name: product.value.name,
    image_url: product.value.image_url,
    price: finalPrice,
    variant_id: selectedVariant.value?.id || null,
    variant_name: selectedVariant.value?.name || null,
    sku: selectedVariant.value?.sku || null,
    quantity: 1,
  };

  // Add to Pinia store
  cartStore.add(payload);

  // Show success dialog
  showCartDialog.value = true;
};

onMounted(() => {
  loadProduct();
});

watch(
  product,
  (data) => {
    if (!data?.name) return;

    useSchemaOrg([
      defineProduct({
        name: data.name,
        description: data.description,
        image: data.images || [],
        sku: data.sku,
        mpn: data.mpn || "",
        gtin13: data.gtin13 || "",
        brand: {
          name: data.brand?.name || "",
        },
        offers: {
          price: data.price,
          priceCurrency: data.currency || "USD",
          priceValidUntil: data.price_valid_until || "",
          url: window.location.href,
          availability: data.in_stock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          itemCondition: "https://schema.org/NewCondition",
        },
        aggregateRating: data.reviews
          ? {
              ratingValue: data.average_rating,
              reviewCount: data.reviews.length,
            }
          : undefined,
        review: data.reviews
          ? data.reviews.map((r) => ({
              author: r.user?.name || "Anonymous",
              datePublished:
                r.created_at?.timestamp || new Date().toISOString(),
              reviewBody: r.review,
              reviewRating: {
                ratingValue: r.rating,
              },
            }))
          : [],
      }),
    ]);
  },
  { immediate: true }
);

const config = useRuntimeConfig();

const addToWishlist = async (product) => {
  if (authStore.token) {
    await wishlistStore.addItem(product);
  } else {
    setTimeout(() => {
      navigateTo("/auth/login");
    }, 2000);
    toast.info("Please login to add to wishlist");
  }
};
</script>

<template>
  <SeoMeta
    :title="product?.meta_title"
    :description="product?.meta_description"
    :keywords="product?.meta_keywords"
    :image="product?.image_url"
  />

  <main class="max-w-7xl mx-auto px-4 py-4">
    <nav class="text-sm text-gray-600 py-4">
      <ul class="flex flex-wrap items-center space-x-1">
        <li>
          <NuxtLink to="/" class="text-gray-700 hover:text-primary font-medium"
            >Home</NuxtLink
          >
        </li>
        <li class="text-gray-400">/</li>
        <li>
          <NuxtLink
            to="/"
            class="text-gray-700 hover:text-primary font-medium"
            >{{ product?.category.name }}</NuxtLink
          >
        </li>
        <li class="text-gray-400">/</li>
        <li class="text-gray-500 font-semibold">
          {{ product?.name }}
        </li>
      </ul>
    </nav>

    <div class="w-full py-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="w-full">
          <ProductGallery :product="product" />
        </div>

        <div class="w-full">
          <div class="space-y-4">
            <h1 class="text-3xl md:text-4xl font-extrabold text-heading">
              {{ product?.name }}
            </h1>

            <div class="flex flex-wrap items-center justify-between">
              <div class="grow flex items-center gap-4">
                <div class="flex items-center space-x-2">
                  <div class="text-yellow-500 flex items-center">
                    <template v-for="i in 5" :key="i">
                      <IconsIconStarFill
                        v-if="i <= Math.floor(product?.rating)"
                        class="size-5"
                      />
                      <IconsIconStar v-else class="size-5" />
                    </template>
                  </div>
                  <span class="font-bold text-gray-800">{{
                    product?.rating
                  }}</span>
                  <span class="text-xs"
                    >({{ product?.review_count }} ratings)</span
                  >
                </div>
                <div class="space-x-2">
                  <span class="font-medium">SKU:</span>
                  <span class="ml-1 font-mono">{{ product?.sku }}</span>
                </div>
                <div class="space-x-2">
                  <span class="font-medium">Sold by:</span>
                  <NuxtLink to="/" class="text-primary">{{
                    product?.store?.name
                  }}</NuxtLink>
                </div>
              </div>

              <div class="flex-none">
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    @click="addToWishlist(product)"
                    class="text-body hover:text-primary transition duration-300"
                  >
                    <IconsIconHeart class="size-5" />
                  </button>
                  <SocialShare
                    :text="product?.name"
                    :url="`${config.public.baseUrl}/product/${product?.slug}/${product?.sku}`"
                  />
                </div>
              </div>
            </div>

            <div class="text-body">
              <div v-html="product?.overview"></div>
            </div>

            <div class="text-4xl font-bold text-red-600">
              <div v-if="product?.price" class="space-x-2">
                <del
                  class="text-body font-body font-semibold text-xl line-through"
                >
                  {{ product?.base_price_formatted }}
                </del>
                <span class="text-primary font-body font-semibold text-2xl">{{
                  product?.price_formatted
                }}</span>
              </div>
              <div v-else>
                <span class="text-gray-900">{{
                  product?.base_price_formatted
                }}</span>
              </div>
            </div>

            <!-- Variants -->
            <div v-if="product?.has_variant">
              <h3 class="font-semibold">Variants:</h3>
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="variant in product?.variants"
                  :key="variant.id"
                  @click="selectedVariant = variant"
                  :class="[
                    'flex flex-wrap items-center gap-2 p-2 rounded border-2 border-border transition-all duration-200',
                    selectedVariant?.id === variant.id
                      ? 'border-primary'
                      : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100',
                  ]"
                >
                  <img
                    :src="variant.image_url"
                    alt="variant.name"
                    class="w-8 h-8 object-cover rounded"
                  />

                  <div class="text-left">
                    <p class="font-medium text-sm">
                      {{ variant.name }}
                    </p>
                    <p class="font-medium text-sm">
                      {{ variant.price_formatted }}
                    </p>
                  </div>
                </button>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <BaseButton
                class="w-full"
                @click="addToCart(product)"
                :loading="cartStore.loading"
                >Add to cart</BaseButton
              >
            </div>

            <div class="space-y-4 pt-4 border-t border-dashed">
              <div v-if="product?.refundable" class="flex items-start gap-3">
                <div class="flex-none">
                  <IconsIconPayment class="size-6 text-primary" />
                </div>
                <div class="grow">
                  <h4 class="font-semibold text-gray-900">Refundable.</h4>
                  <div v-html="product?.refundable" class="text-gray-600"></div>
                </div>
              </div>
              <div v-if="product?.warranty" class="flex items-start gap-3">
                <div class="flex-none">
                  <IconsIconWarranty class="size-6 text-primary" />
                </div>
                <div class="grow">
                  <h4 class="font-semibold text-gray-900">Warranty.</h4>
                  <div v-html="product?.warranty" class="text-gray-600"></div>
                </div>
              </div>
              <div v-if="product?.conditions" class="flex items-start gap-3">
                <div class="flex-none">
                  <IconsIconInfo class="size-6 text-primary" />
                </div>
                <div class="grow">
                  <h4 class="font-semibold text-gray-900">Conditions.</h4>
                  <div v-html="product?.conditions" class="text-gray-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white py-4 rounded-xl">
      <Tabs
        :tabs="[
          { label: 'Description', slot: 'description' },
          { label: 'Specifications', slot: 'specifications' },
          { label: 'Reviews', slot: 'reviews' },
        ]"
      >
        <template #description>
          <div
            v-html="product?.description"
            class="text-body leading-relaxed space-y-6"
          ></div>
        </template>
        <template #specifications>
          <table
            v-for="section in product?.specifications"
            :key="section.title"
            class="mb-6 border w-full"
          >
            <thead>
              <tr class="bg-gray-100">
                <th class="text-left p-2" colspan="2">{{ section.title }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in section.items" :key="item.label">
                <td class="p-2 border-t w-1/4 font-medium text-gray-600">
                  {{ item.label }}
                </td>
                <td class="p-2 border-t">{{ item.value }}</td>
              </tr>
            </tbody>
          </table>
        </template>
        <template #reviews>
          <ProductReview />
        </template>
      </Tabs>
    </div>

    <div class="py-8 md:16">
      <div class="flex flex-wrap items-center justify-between mb-4">
        <div class="block">
          <h2 class="text-2xl font-bold text-heading">Related products</h2>
          <span class="text-body text-sm mt-1">
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
        wheel-gestures
        :items="related"
        :ui="{ item: 'basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5' }"
        class="gap-4"
      >
        <ProductCard :product="item" />
      </UCarousel>
    </div>
  </main>

  <!-- Dialog -->
  <CartSuccessDialog :show="showCartDialog" @close="showCartDialog = false" />
</template>

<style scoped></style>
