<script setup>
import { useProductStore } from "@/stores/product";
import { useCartStore } from "@/stores/cart";
import Tabs from "~/components/Tabs.vue";

const productStore = useProductStore();
const route = useRoute();
const cartStore = useCartStore();
const { product, related } = storeToRefs(productStore);

const showCartDialog = ref(false);
const selectedVariant = ref(null);

const loadProduct = async () => {
  const response = await productStore.getProduct(
    route.params.slug,
    route.params.code
  );
  product.value = response.product;
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

useSchemaOrg([
  defineProduct({
    name: "Premium Ergonomic Office Chair",
    description:
      "High-quality office chair with lumbar support and adjustable height.",
    image: [
      "https://example.com/images/chair-front.jpg",
      "https://example.com/images/chair-side.jpg",
      "https://example.com/images/chair-back.jpg",
    ],
    sku: "CHAIR-123",
    mpn: "ERGO-2023-BLK",
    gtin13: "9780123456789",
    brand: {
      name: "ErgoComfort",
    },
    offers: {
      price: 299.99,
      priceCurrency: "USD",
      priceValidUntil: "2023-12-31",
      url: "https://example.com/chair-ergonomic",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      ratingValue: 4.7,
      reviewCount: 89,
    },
    review: [
      {
        author: "Jane Doe",
        datePublished: "2023-01-15",
        reviewBody:
          "This chair has dramatically improved my posture and comfort throughout the workday.",
        reviewRating: {
          ratingValue: 5,
        },
      },
      {
        author: "John Smith",
        datePublished: "2023-02-20",
        reviewBody:
          "Excellent build quality, but took some time to adjust properly.",
        reviewRating: {
          ratingValue: 4,
        },
      },
    ],
  }),
]);
</script>

<template>
  <SeoMeta
    title="Buyzin | Shop Smart. Live Easy. | Best Deals on Fashion, Gadgets & Lifestyle in Bangladesh"
    description="Shop online with Buyzin for 100% authentic products, fast delivery & easy returns across Bangladesh. Find the best deals on fashion, electronics, home goods & more. Shop Smart. Live Easy."
    keywords="ecommerce, online shopping, buy online, fashion, gadgets, electronics, Bangladesh, best price, quick delivery, Buyzin"
    image=""
  />

  <main class="max-w-7xl mx-auto px-4 py-4">
    <nav class="text-sm text-gray-600 py-4">
      <ul class="flex flex-wrap items-center space-x-1">
        <li>
          <a
            href="https://klbtheme.com/grogin"
            class="text-gray-700 hover:text-primary font-medium"
            >Home</a
          >
        </li>
        <li class="text-gray-400">/</li>
        <li>
          <a
            href="https://klbtheme.com/grogin/product-category/beverages/"
            class="text-gray-700 hover:text-primary font-medium"
            >Beverages</a
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
          <div class="space-y-6">
            <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900">
              {{ product?.name }}
            </h1>

            <div
              class="flex flex-wrap items-center gap-4 text-sm text-gray-600 border-b pb-4"
            >
              <div class="flex items-center space-x-2">
                <div class="text-yellow-500 flex items-center">
                  <template v-for="i in 5" :key="i">
                    <IconsIconStarFill
                      v-if="i <= Math.floor(product?.rating)"
                      class="icon__star filled"
                    />
                    <IconsIconStar v-else class="icon__star" />
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
            <div v-if="product?.has_variant" class="mb-6">
              <h3 class="font-semibold text-lg mb-3">Variants:</h3>
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
              <div
                class="flex-none items-center border border-border rounded overflow-hidden"
              >
                <button
                  type="button"
                  class="px-3 py-2 text-red-500"
                  @click="decrease"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <input
                  value="1"
                  type="number"
                  min="1"
                  max="48"
                  class="w-auto text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button type="button" class="px-3 py-2 text-green-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>

              <div class="w-full flex items-center gap-4">
                <BaseButton
                  @click="addToCart(product)"
                  :loading="cartStore.loading"
                  >Add to cart</BaseButton
                >
                <button type="button" class="base__secondary w-full">
                  Buy Now
                </button>
              </div>
            </div>

            <div class="space-y-4 pt-4 border-t border-dashed">
              <div class="flex items-start gap-3">
                <div class="flex-none">
                  <IconsIconPayment class="size-6 text-primary" />
                </div>
                <div class="grow">
                  <p class="text-base font-semibold text-gray-900">Payment.</p>
                  <p class="text-gray-600">
                    Payment upon receipt of goods, Payment by card in the
                    department, Google Pay, Online card, -5% discount in case of
                    payment
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex-none">
                  <IconsIconWarranty class="size-6 text-primary" />
                </div>
                <div class="grow">
                  <p class="text-base font-semibold text-gray-900">Warranty.</p>
                  <p class="text-gray-600">
                    The Consumer Protection Act does not provide for the return
                    of this product of proper quality.
                  </p>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap gap-4 pt-4 border-t">
              <button
                type="button"
                class="text-primary hover:text-primary/70 flex items-center"
              >
                <IconsIconHeart class="size-6 mr-2" />
                Add to wishlist
              </button>
              <a
                href="#"
                class="text-primary hover:text-primary/70 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>

                Share this Product
              </a>
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
          <div class="text-body text-base leading-relaxed space-y-6">
            <p>
              Quisque varius diam vel metus mattis, id aliquam diam rhoncus.
              Proin vitae magna in dui finibus malesuada et at nulla. Morbi elit
              ex, viverra vitae ante vel, blandit feugiat ligula. Fusce
              fermentum iaculis nibh, at sodales leo maximus a. Nullam ultricies
              sodales nunc, in pellentesque lorem mattis quis. Cras imperdiet
              est in nunc tristique lacinia. Nullam aliquam mauris eu accumsan
              tincidunt. Suspendisse velit ex, aliquet vel ornare vel, dignissim
              a tortor.
            </p>
            <p>
              Quisque varius diam vel metus mattis, id aliquam diam rhoncus.
              Proin vitae magna in dui finibus malesuada et at nulla. Morbi elit
              ex, viverra vitae ante vel, blandit feugiat ligula. Fusce
              fermentum iaculis nibh, at sodales leo maximus a. Nullam ultricies
              sodales nunc, in pellentesque lorem mattis quis. Cras imperdiet
              est in nunc tristique lacinia. Nullam aliquam mauris eu accumsan
              tincidunt. Suspendisse velit ex, aliquet vel ornare vel, dignissim
              a tortor.
            </p>
            <p>
              Quisque varius diam vel metus mattis, id aliquam diam rhoncus.
              Proin vitae magna in dui finibus malesuada et at nulla. Morbi elit
              ex, viverra vitae ante vel, blandit feugiat ligula. Fusce
              fermentum iaculis nibh, at sodales leo maximus a. Nullam ultricies
              sodales nunc, in pellentesque lorem mattis quis. Cras imperdiet
              est in nunc tristique lacinia. Nullam aliquam mauris eu accumsan
              tincidunt. Suspendisse velit ex, aliquet vel ornare vel, dignissim
              a tortor.
            </p>
          </div>
        </template>
        <template #specifications>
          <table class="mb-6 border w-full">
            <thead>
              <tr class="bg-gray-100">
                <th class="text-left p-2" colspan="2">Display Features</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in 10">
                <td class="p-2 border-t w-1/4 font-medium text-gray-600">
                  Display Size
                </td>
                <td class="p-2 border-t">21.45 Inch</td>
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

      <Carousel
        :items-to-show="5"
        :wrap-around="true"
        :gap="10"
        :autoplay="3000"
        :transition="1000"
        :snap-align="'start'"
        :mouse-drag="true"
        :touch-drag="true"
        :breakpoints="{
          480: { itemsToShow: 2, gap: 10 },
          640: { itemsToShow: 3, gap: 10 },
          768: { itemsToShow: 4, gap: 10 },
          1024: { itemsToShow: 5, gap: 10 },
          1280: { itemsToShow: 5, gap: 10 },
        }"
      >
        <Slide v-for="product in related" :key="product.id">
          <ProductCard :product="product" />
        </Slide>
      </Carousel>
    </div>
  </main>

  <!-- Dialog -->
  <CartSuccessDialog :show="showCartDialog" @close="showCartDialog = false" />
</template>

<style scoped></style>
