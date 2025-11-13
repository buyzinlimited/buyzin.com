<script setup>
const authStore = useAuthStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const addToWishlist = async (product) => {
  if (authStore.token) {
    await wishlistStore.addToWishlist(product);
  }
  setTimeout(() => {
    navigateTo("/auth/login");
  }, 2000);
};
</script>

<template>
  <article class="product__card">
    <div class="product__badge">
      <span class="product__promo__badge">12% OFF</span>
    </div>

    <NuxtLink
      :to="`/product/${product.slug}/${product.sku}`"
      :title="product.name"
    >
      <div class="shine__img__wrapper">
        <img
          :src="product.image_url"
          :alt="product.name"
          class="product__card__img shine__img"
        />
      </div>
    </NuxtLink>

    <div class="product__info">
      <NuxtLink :to="`/product/${product.slug}/${product.sku}`">
        <h3 class="product__title">{{ product.name }}</h3>
      </NuxtLink>

      <div class="product__review">
        <div class="product__rating">
          <template v-for="i in 5" :key="i">
            <IconsIconStarFill
              v-if="i <= Math.floor(product.rating)"
              class="icon__star filled"
            />
            <IconsIconStar v-else class="icon__star" />
          </template>
        </div>
        <span class="product__review__count"
          >{{ product.review_count ?? 0 }} reviews</span
        >
      </div>

      <div class="product__meta">
        <div class="product__price">
          <div v-if="product.price" class="space-x-2">
            <span class="final__price">{{ product.price_formatted }}</span>
            <span class="base__price">{{ product.base_price_formatted }}</span>
          </div>
          <div v-else>
            <span class="base__price">{{ product.base_price_formatted }}</span>
          </div>
        </div>

        <button type="button" class="wishlist__action">
          <IconsIconHeart class="size-6" />
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped></style>
