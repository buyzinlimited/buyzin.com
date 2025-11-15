<script setup>
import ProfileLayout from "./ProfileLayout.vue";

const wishlistStore = useWishlistStore();
const items = ref(null);

const loadWishlist = async () => {
  const response = await wishlistStore.getWishlist();
  console.log(response.data);
  items.value = response.data;
};

const removeWishlist = async (product) => {
  if (confirm("Are you sure you went to remove form wishlist?")) {
    await wishlistStore.remove(product);
  }
};

onMounted(() => {
  loadWishlist();
});
</script>

<template>
  <ProfileLayout>
    <SeoMeta
      title="My Account | Buyzin - Manage Your Orders & Profile in Bangladesh"
      description="Access your Buyzin account to view orders, track shipments, manage your profile, and update your preferences. Enjoy seamless online shopping in Bangladesh."
      keywords="Buyzin My Account, account management Bangladesh, order tracking, profile settings, online shopping dashboard, ecommerce account Bangladesh"
    />
    <div class="card">
      <div class="card__header">
        <h3 class="card__title">Wishlist</h3>
      </div>
      <div class="card__body">
        <template v-if="items?.data">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <article
              v-for="item in items?.data"
              :key="item.id"
              class="relative group border border-border"
            >
              <button
                @click="removeWishlist(item.product)"
                class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 transition"
              >
                <IconsIconClose class="size-4" />
              </button>

              <NuxtImg
                :src="item.product?.image_url"
                :alt="item.product?.name"
                loading="lazy"
                class="w-full object-cover rounded-lg"
              />

              <div class="space-y-2 p-4">
                <h3 class="text-base font-semibold text-body">
                  <NuxtLink
                    :to="`/product/${item.product?.slug}/${item.product?.sku}`"
                    :title="item.product?.name"
                    target="_blank"
                    class="hover:text-primary transition"
                  >
                    {{ item.product?.name }}
                  </NuxtLink>
                </h3>
                <div class="flex items-center justify-between mt-2">
                  <div v-if="item.product?.price" class="space-x-2">
                    <del class="text-body font-body line-through">
                      {{ item.product?.base_price_formatted }}
                    </del>
                    <span
                      class="text-primary font-body font-semibold text-base"
                      >{{ item.product?.price_formatted }}</span
                    >
                  </div>
                  <div v-else>
                    <span class="text-body">{{
                      item.product?.base_price_formatted
                    }}</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </template>
        <template v-else>
          <UEmpty
            title="Your wishlist is empty"
            description="Looks like you haven't added anything yet. Start exploring and save your favorite products!"
          />
        </template>
      </div>
    </div>
  </ProfileLayout>
</template>

<style scoped></style>
