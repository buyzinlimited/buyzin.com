<script setup>
const authStore = useAuthStore();
const wishlistStore = useWishlistStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const addToWishlist = async (product) => {
  if (authStore.token) {
    await wishlistStore.addItem(product);
  }
  setTimeout(() => {
    navigateTo("/auth/login");
  }, 2000);
};
</script>

<template>
  <article
    class="bg-white border border-border rounded-lg overflow-hidden relative"
  >
    <div class="flex items-center justify-between p-2 absolute z-20">
      <span
        class="text-xs font-semibold px-2 py-1 rounded-l rounded-r-full bg-red-100 text-red-500"
        v-if="product.price && product.base_price > product.price"
      >
        {{ product.currency_symbol
        }}{{ product.base_price - product.price }} OFF
      </span>
    </div>

    <NuxtLink
      :to="`/product/${product.slug}/${product.sku}`"
      :title="product.name"
    >
      <div class="shine__img__wrapper">
        <NuxtImg
          :src="product.cover_url"
          :alt="product.name"
          loading="lazy"
          class="bg-white w-full h-full object-contain transition-transform duration-300 ease-in-out shine__img"
        />
      </div>
    </NuxtLink>

    <div class="px-2.5 py-2">
      <NuxtLink :to="`/product/${product.slug}/${product.sku}`">
        <h3
          class="text-base line-clamp-2 font-semibold hover:text-primary transition duration-150"
        >
          {{ product.name }}
        </h3>
      </NuxtLink>

      <div class="flex items-center gap-1">
        <div class="flex items-center gap-0.5">
          <template v-for="i in 5" :key="i">
            <IconsIconStarFill
              v-if="i <= Math.floor(product.rating)"
              class="icon__star filled"
            />
            <IconsIconStar v-else class="icon__star" />
          </template>
        </div>
        <span class="text-sm text-body"
          >{{ product.review_count ?? 0 }} reviews</span
        >
      </div>

      <div class="flex items-center justify-between py-2">
        <div class="flex items-center gap-2">
          <div v-if="product.price" class="space-x-2">
            <del class="text-body font-body"
              >{{ product.currency_symbol }}{{ product.base_price }}</del
            >
            <span class="text-primary font-body font-semibold text-base">
              {{ product.currency_symbol }}{{ product.price }}
            </span>
          </div>
          <div v-else>
            <span class="text-primary font-body font-semibold text-base">
              {{ product.currency_symbol }}{{ product.base_price }}
            </span>
          </div>
        </div>

        <button
          type="button"
          @click="addToWishlist(product)"
          class="hover:text-primary transition duration-150"
        >
          <IconsIconHeart class="size-6" />
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.icon__star {
  width: 1rem;
  height: 1rem;
  color: #9ca3af;
}

.icon__star.filled {
  color: #fbbf24;
}

.shine__img__wrapper {
  position: relative;
  overflow: hidden;
  display: block;
}

.shine__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease-in-out;
  display: block;
}

.shine__img__wrapper:hover .shine__img {
  transform: scale(1.05);
}

/* Shine effect pseudo-element */
:deep(.shine__img__wrapper)::before {
  content: "";
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-25deg);
  z-index: 10;
  pointer-events: none;
}

/* Hover animation */
:deep(.shine__img__wrapper:hover)::before {
  animation: shine 1s ease-in-out;
}

@keyframes shine {
  0% {
    left: -75%;
  }

  100% {
    left: 125%;
  }
}
</style>
