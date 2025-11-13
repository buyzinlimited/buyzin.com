<script setup>
import { ref } from "vue";

const order = ref({
  id: "OD45126581664902",
  balance: "$45.80",
  product: {
    name: "Earth's Best Strawberry Banana Fruit Yogurt Smoothie 4.2 oz",
    soldBy: "Earth's Best",
    price: "$8.28",
    weight: "32.9 c/oz",
    deliveryExpected: "Jun 27",
  },
  tracking: [
    {
      date: "Jun 28, Mon",
      status: "Ordered",
      time: "6:00 AM",
      location: "Seller Facility",
    },
    {
      date: "Jun 29, Tue",
      status: "Order Process",
      time: "02:30 PM",
      location: "Boston, USA",
    },
    {
      date: "Jun 30, Wed",
      status: "Packed",
      time: "10:00 AM",
      location: "New York, USA",
    },
    {
      date: "Jul 01, Thu",
      status: "Shipped",
      time: "04:00 PM",
      location: "New York, USA",
    },
    {
      date: "Expected Jul 02",
      status: "Delivered",
      time: "06:30 PM",
      location: "New York, USA",
    },
  ],
  deliveryAddress: {
    name: "Brandon Carl",
    address: "326, Hoffman Avenue, New York, United States - 10016",
    phone: "+1 XXXXX XXXXX",
  },
  otherItems: [
    {
      name: "Men's Long-Sleeve Shirt",
      soldBy: "Fashionworld",
      price: "$162",
      oldPrice: "$180",
      discount: "10% OFF",
      color: "Blue",
      size: "M",
      deliveryExpected: "July 05",
    },
    {
      name: "PediaSure Grow & Gain Non-GMO",
      soldBy: "PediaSure",
      price: "$13.97",
      deliveryExpected: "July 10",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen py-8">
    <div class="container mx-auto">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-500 space-x-1 mb-3">
        <NuxtLink to="/" class="hover:underline">Home</NuxtLink> /
        <NuxtLink to="/my-account" class="hover:underline">My Account</NuxtLink>
        /
        <NuxtLink to="/my-orders" class="hover:underline">My Orders</NuxtLink> /
        <span class="font-semibold">{{ order.id }}</span>
      </nav>

      <div class="grid md:grid-cols-3 gap-4">
        <div class="col-span-2">
          <div
            class="flex justify-between items-start bg-white p-4 rounded-xl gap-4"
          >
            <!-- Left: Product Info -->
            <div class="flex items-start">
              <NuxtImg
                src="/products/1.jpg"
                alt="Product"
                loading="lazy"
                class="h-24 w-24 object-cover rounded-lg"
              />
              <div class="ml-4">
                <h2 class="text-lg font-semibold">
                  {{ order.product.name }}
                </h2>
                <p class="text-gray-500 text-sm">
                  Sold & Shipped by:
                  <span class="font-medium text-gray-700">{{
                    order.product.soldBy
                  }}</span>
                </p>
                <p class="text-primary font-semibold mt-1">
                  {{ order.product.price }}
                  <span class="text-sm text-gray-500"
                    >({{ order.product.weight }})</span
                  >
                </p>
              </div>
            </div>

            <!-- Right: Delivery & Actions -->
            <div class="text-right space-y-2">
              <p class="text-sm text-gray-600">
                Delivery expected by
                <span class="font-medium text-gray-800">12 Feb 2025</span>
              </p>
              <button
                class="bg-red-500 text-white hover:bg-red-600 px-4 py-1.5 rounded-full text-sm font-semibold transition"
              >
                Cancel Order
              </button>
              <button
                class="bg-primary text-white hover:bg-primary/80 px-4 py-1.5 rounded-full text-sm font-semibold transition"
              >
                Need Help
              </button>
            </div>
          </div>
        </div>

        <div class="block">
          <div class="space-y-4">
            <!-- Delivery Address -->
            <div class="bg-white rounded-xl p-4">
              <h3 class="text-md font-semibold mb-2">Delivery Address</h3>
              <p class="font-medium">{{ order.deliveryAddress.name }}</p>
              <p class="text-gray-500">{{ order.deliveryAddress.address }}</p>
              <p class="text-gray-500">
                Phone: {{ order.deliveryAddress.phone }}
              </p>
            </div>

            <!-- Other Items -->
            <div class="bg-white rounded-xl p-4">
              <h3 class="text-md font-semibold mb-4">
                Other items in this order
              </h3>
              <div class="space-y-4">
                <div
                  v-for="item in order.otherItems"
                  :key="item.name"
                  class="flex items-center justify-between gap-4"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="size-28 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400"
                    >
                      Img
                    </div>
                    <div>
                      <h4 class="font-medium">{{ item.name }}</h4>
                      <p class="text-gray-500 text-sm">
                        Sold by: {{ item.soldBy }}
                      </p>
                      <p class="text-primary font-semibold">
                        {{ item.price }}
                        <span
                          v-if="item.oldPrice"
                          class="line-through text-gray-400 ml-1"
                          >{{ item.oldPrice }}</span
                        >
                        <span
                          v-if="item.discount"
                          class="text-green-500 ml-1"
                          >{{ item.discount }}</span
                        >
                      </p>
                      <p
                        v-if="item.color || item.size"
                        class="text-gray-500 text-sm"
                      >
                        <span v-if="item.color">Color: {{ item.color }}</span>
                        <span v-if="item.size"> | Size: {{ item.size }}</span>
                      </p>
                      <p class="text-gray-400 text-xs">
                        Delivery expected by {{ item.deliveryExpected }}
                      </p>
                      <p class="text-gray-400 text-xs">
                        Return valid till 12 jan 2026
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
