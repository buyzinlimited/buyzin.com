<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();
const { items } = storeToRefs(cartStore);

const couponCode = ref("WELCOME");

const couponApply = async () => {
  if (!couponCode.value) return;
  await cartStore.couponApply(couponCode.value);
};

useSchemaOrg([
  defineWebPage({
    "@type": "CheckoutPage",
    name: "Your Shopping Cart",
    description: "Review and edit your shopping cart items before checkout.",
  }),
]);
</script>

<template>
  <SeoMeta
    title="Your Shopping Cart | Buyzin - Review & Checkout Securely"
    description="View and manage the items in your Buyzin shopping cart. Review product details, update quantities, and proceed to secure checkout with fast delivery across Bangladesh."
    keywords="shopping cart, checkout, buy online, ecommerce, Buyzin, Bangladesh, cart items, secure payment, online shopping, fast delivery"
  />
  <div class="container mx-auto py-6">
    <div class="flex flex-wrap justify-between w-full gap-6">
      <!-- Left side -->
      <div class="bg-white rounded-xl grow p-4">
        <!-- show EmptyCart only when no items -->
        <template v-if="items.length">
          <div class="card">
            <div class="card__header flex items-center justify-between">
              <h3 class="card__title">Shopping Cart ({{ items.length }})</h3>
              <button
                type="button"
                class="text-sm text-danger hover:text-danger/80"
                @click="cartStore.clear"
              >
                Clear all
              </button>
            </div>

            <div class="card__body">
              <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 divide-dashed">
                  <li
                    v-for="item in items"
                    :key="item.id"
                    class="flex items-center py-4"
                  >
                    <div
                      class="size-20 shrink-0 overflow-hidden rounded-md border border-gray-200"
                    >
                      <NuxtImg
                        :src="item.image_url"
                        :alt="item.name"
                        class="size-full object-cover"
                      />
                    </div>

                    <!-- Product info -->
                    <div class="ml-4 grow space-y-1">
                      <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold">
                          {{ item.name }}
                        </h3>
                        <button
                          type="button"
                          class="text-danger hover:text-danger/70 transition"
                          @click="cartStore.remove(item.id)"
                        >
                          Remove
                        </button>
                      </div>

                      <div class="flex flex-wrap text-sm text-gray-600">
                        <span
                          class="after:content-['•'] after:mx-2 last:after:content-none"
                        >
                          SKU: {{ item.sku }}
                        </span>

                        <template v-if="false">
                          <div
                            v-for="(option, i) in item.variant.options"
                            :key="i"
                            class="flex flex-wrap gap-1"
                          >
                            <div
                              v-for="(value, key) in option"
                              :key="key"
                              class="capitalize after:content-['•'] after:mx-2 last:after:content-none"
                            >
                              {{ key }}: {{ value }}
                            </div>
                          </div>
                        </template>
                      </div>

                      <!-- Price & Quantity -->
                      <div class="flex items-center justify-between mt-1">
                        <div>
                          <span class="text-base font-semibold text-body">
                            {{ $currency(item.price) }}</span
                          >
                        </div>

                        <div class="flex items-center">
                          <button
                            type="button"
                            class="bg-red-100 p-1 rounded-full text-red-500"
                            aria-label="Decrease quantity"
                            @click="cartStore.decrease(item.id)"
                          >
                            <IconsIconMinus class="size-4" />
                          </button>
                          <span class="w-8 text-center">{{
                            item.quantity
                          }}</span>
                          <button
                            type="button"
                            class="bg-green-100 p-1 rounded-full text-green-500"
                            aria-label="Increase quantity"
                            @click="cartStore.increase(item.id)"
                          >
                            <IconsIconPlus class="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </template>

        <!-- Empty cart items -->
        <template v-else>
          <EmptyCart />
        </template>
      </div>

      <!-- Right side (Summary) -->
      <div class="flex-none w-full max-w-sm">
        <div class="card">
          <div class="card__header">
            <h3 class="card__title">Cart Summary</h3>
          </div>

          <div class="card__body space-y-4 border-b border-dashed">
            <div class="border-b border-dashed border-gray-300 pb-4">
              <label
                class="text-sm font-medium mb-1 flex justify-between items-center"
                ><span>Coupon Code</span></label
              >
              <div class="flex">
                <input
                  v-model="couponCode"
                  type="text"
                  placeholder="Enter Coupon Code"
                  class="grow border border-border focus:outline-none rounded-l-md px-3 py-2 text-sm"
                />
                <button
                  @click.prevent="couponApply"
                  :disabled="!couponCode"
                  class="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/70 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Apply
                </button>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span>{{ $currency(cartStore.subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Discount</span>
                <span>{{ $currency(cartStore.discount) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Shipping</span>
                <span>{{ $currency(cartStore.shipping) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Tax</span>
                <span>{{ $currency(cartStore.tax) }}</span>
              </div>
              <div class="flex justify-between font-semibold">
                <span>Total</span>
                <span>{{ $currency(cartStore.total) }}</span>
              </div>
            </div>

            <div class="py-2">
              <NuxtLink
                to="/checkout"
                :disabled="!items?.length"
                class="base__button w-full"
              >
                Proceed to Checkout
              </NuxtLink>

              <div class="mt-2 text-center text-sm text-gray-500">
                <p>
                  or
                  <NuxtLink
                    to="/shop"
                    class="font-medium text-primary hover:opacity-90"
                  >
                    Continue Shopping &rarr;
                  </NuxtLink>
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg p-4 mt-3">
            <h3 class="text-base font-semibold mb-2">Buyer Protection</h3>
            <p class="text-sm text-gray-600">
              Get full refund if the item is not as described or not delivered.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
