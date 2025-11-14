<script setup>
import ProfileLayout from "./ProfileLayout.vue";

const wishlistStore = useWishlistStore();
const { count, items } = storeToRefs(wishlistStore);

const loadWishlist = async () => {
  await wishlistStore.getWishlist();
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
        <h3 class="card__title">Wishlist {{ count }}</h3>
      </div>
      <div class="card__body">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <article class="relative group border border-border">
            <button
              class="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
            >
              <IconsIconClose class="size-5" />
            </button>

            <NuxtImg
              src="/products/1.jpg"
              alt="Shop Item2"
              loading="lazy"
              class="w-full h-48 object-cover rounded-lg"
            />

            <div class="space-y-2 p-4">
              <div class="text-sm text-gray-500">Asus</div>

              <div class="text-base font-semibold text-gray-900">
                <a href="#" class="hover:text-primary transition">
                  ASUS TUF Dash 15 15.6&quot; Gaming Laptop - Grey (Intel Core
                  i7-11370H/512GB SSD/16GB RAM/RTX 3060/Win11)
                </a>
              </div>

              <!-- Review -->
              <div class="flex items-center space-x-2">
                <ul class="flex space-x-1">
                  <li><i class="fas fa-star text-yellow-400"></i></li>
                  <li><i class="fas fa-star text-yellow-400"></i></li>
                  <li><i class="fas fa-star text-yellow-400"></i></li>
                  <li><i class="fas fa-star text-yellow-400"></i></li>
                  <li><i class="fas fa-star text-yellow-400"></i></li>
                </ul>
                <div class="text-sm text-gray-500">
                  <a href="#" class="hover:underline">3,014 reviews</a>
                </div>
              </div>

              <!-- Footer / Price -->
              <div class="flex items-center justify-between mt-2">
                <div class="text-lg font-semibold text-gray-900">
                  $399.00
                  <span class="text-sm text-gray-400 line-through ml-1"
                    >$450</span
                  >
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </ProfileLayout>
</template>

<style scoped></style>
