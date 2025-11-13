<script setup>
import { ref } from "vue";

// Dummy wishlist items
const wishlist = ref([
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$120.00",
    image: "/products/headphones.jpg",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$75.50",
    image: "/products/watch.jpg",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: "$150.00",
    image: "/products/shoes.jpg",
  },
  {
    id: 4,
    name: "Backpack",
    price: "$60.00",
    image: "/products/backpack.jpg",
  },
]);

const removeItem = (id) => {
  wishlist.value = wishlist.value.filter((item) => item.id !== id);
};
</script>

<template>
  <div class="container mx-auto py-8">
    <div class="bg-white rounded-2xl px-6 py-8">
      <h3 class="text-2xl font-bold mb-6">My Wishlist</h3>

      <div v-if="wishlist.length === 0" class="text-center py-20 text-gray-500">
        Your wishlist is empty.
      </div>

      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div v-for="item in wishlist" :key="item.id">
          <article class="product__card">
            <div class="product__badge">
              <span class="product__promo__badge">12% OFF</span>
              <button class="product__close__badge">
                <IconsIconClose
                  class="size-5 text-red-500 bg-red-100 p-0.5 rounded-full"
                />
              </button>
            </div>

            <NuxtLink to="/" title="">
              <div class="shine__img__wrapper">
                <img
                  src="/products/1.jpg"
                  alt=""
                  class="product__card__img shine__img"
                />
              </div>
            </NuxtLink>

            <div class="product__info">
              <div class="product__review">
                <div class="product__rating">
                  <template v-for="i in 5" :key="i">
                    <IconsIconStarFill
                      v-if="i <= Math.floor(4.5)"
                      class="icon__star filled"
                    />
                    <IconsIconStar v-else class="icon__star" />
                  </template>
                </div>
                <span class="product__review__count">(6)</span>
              </div>

              <NuxtLink to="product/">
                <h3 class="product__title">{{ item.name }}</h3>
              </NuxtLink>

              <div class="product__meta">
                <div class="product__price">
                  <div v-if="true" class="space-x-2">
                    <span class="final__price">{{ item.price }}</span>
                    <span class="base__price">{{ item.price }}</span>
                  </div>
                  <div v-else>
                    <span class="base__price">{{ item.price }}</span>
                  </div>
                </div>

                <button type="button" class="cart__action">Add To Cart</button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
