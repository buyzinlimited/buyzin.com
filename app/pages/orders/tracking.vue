<script setup>
import { ref } from "vue";

/* Mock order data — replace with your API data */
const order = ref({
  id: "ORD-2025-00123",
  status: "Out for Delivery", // e.g. "Processing", "Packed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"
  placed_at: "2025-10-30T09:20:00Z",
  payment: { method: "Bkash", status: "Paid" },
  customer: {
    name: "Abu Toha",
    phone: "+8801912345678",
    address: "House 12, Road 4, Gulshan 2, Dhaka, Bangladesh — 1212",
  },
  items: [
    { id: 1, name: "Wireless Headphones", qty: 1, price: 45.0 },
    { id: 2, name: "Protein Shake (4pk)", qty: 2, price: 12.5 },
  ],
  shipping: {
    provider: "RedX",
    tracking_id: "RX-998877",
    eta: "2025-11-04",
  },
  timeline: [
    {
      time: "2025-10-30 09:20",
      event: "Order Placed",
      note: "Payment received",
    },
    {
      time: "2025-10-30 12:00",
      event: "Order Confirmed",
      note: "Packed by warehouse",
    },
    { time: "2025-10-31 08:30", event: "Shipped", note: "Handed over to RedX" },
    {
      time: "2025-11-03 07:15",
      event: "Out for Delivery",
      note: "Delivery partner on the way",
    },
  ],
});

const progressStages = [
  { key: "Processing", label: "Processing" },
  { key: "Packed", label: "Packed" },
  { key: "Shipped", label: "Shipped" },
  { key: "Out for Delivery", label: "Out for Delivery" },
  { key: "Delivered", label: "Delivered" },
];

const calcTotal = (items) =>
  items.reduce((s, i) => s + i.qty * i.price, 0).toFixed(2);
</script>

<template>
  <SeoMeta
    title="Order Tracking | Buyzin - Track Your Online Orders in Bangladesh"
    description="Track your Buyzin orders in real-time. Enter your order ID to check the shipping status, delivery updates, and estimated arrival. Shop confidently with Buyzin in Bangladesh."
    keywords="Buyzin order tracking, track orders Bangladesh, online shopping shipment status, delivery updates, ecommerce tracking Bangladesh, Buyzin order status"
  />

  <div class="min-h-screen py-10">
    <div class="container mx-auto">
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
      >
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
            Order Tracking
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Track your order status and delivery updates
          </p>
        </div>
        <div class="flex items-center gap-3">
          <div class="text-sm text-gray-600">
            <p>Order ID</p>
            <p class="font-medium text-gray-800">{{ order.id }}</p>
          </div>
          <div class="text-sm text-gray-600 pl-4 border-l border-gray-200">
            <p>Placed</p>
            <p class="font-medium text-gray-800">
              {{ new Date(order.placed_at).toLocaleString() }}
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left: Tracking + Timeline -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Progress Tracker -->
          <div class="bg-white rounded-xl p-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">
              Delivery Progress
            </h2>

            <div class="relative overflow-x-auto">
              <div class="flex flex-wrap items-center gap-4">
                <div class="w-full">
                  <div class="flex items-center justify-between mb-3">
                    <div class="text-sm font-medium text-gray-700">Status</div>
                    <div class="text-sm font-semibold text-gray-900">
                      {{ order.status }}
                    </div>
                  </div>

                  <div class="flex items-center gap-4">
                    <template
                      v-for="(stage, idx) in progressStages"
                      :key="stage.key"
                    >
                      <div class="text-left space-y-2">
                        <div class="flex items-center">
                          <!-- circle -->
                          <div
                            :class="[
                              'w-8 h-8 flex items-center justify-center rounded-full border-2',
                              order.status === stage.key ||
                              progressStages.findIndex(
                                (s) => s.key === order.status
                              ) > idx
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-500 border-gray-200',
                            ]"
                          >
                            <svg
                              v-if="
                                order.status === stage.key ||
                                progressStages.findIndex(
                                  (s) => s.key === order.status
                                ) > idx
                              "
                              xmlns="http://www.w3.org/2000/svg"
                              class="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <svg
                              v-else
                              xmlns="http://www.w3.org/2000/svg"
                              class="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <circle cx="12" cy="12" r="3" stroke-width="2" />
                            </svg>
                          </div>

                          <!-- line -->
                          <div
                            v-if="idx < progressStages.length - 1"
                            :class="[
                              'w-14 h-0.5 mx-3',
                              progressStages.findIndex(
                                (s) => s.key === order.status
                              ) > idx
                                ? 'bg-primary'
                                : 'bg-gray-200',
                            ]"
                          ></div>
                        </div>
                        <span>{{ stage.label }}</span>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Timeline -->
          <div class="bg-white rounded-xl p-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">
              Shipment Timeline
            </h2>

            <ol class="relative border-l border-gray-200">
              <li v-for="(t, i) in order.timeline" :key="i" class="mb-6 ml-6">
                <span
                  class="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full"
                  :class="
                    i === order.timeline.length - 1
                      ? 'bg-primary text-white'
                      : 'bg-white text-primary border border-primary'
                  "
                >
                  <svg
                    v-if="i === order.timeline.length - 1"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="3" stroke-width="2" />
                  </svg>
                </span>
                <div class="text-sm text-gray-800 font-medium">
                  {{ t.event }}
                </div>
                <div class="text-xs text-gray-500">{{ t.note }}</div>
                <div class="text-xs text-gray-400 mt-1">{{ t.time }}</div>
              </li>
            </ol>
          </div>

          <!-- Items list -->
          <div class="bg-white rounded-xl p-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">
              Items in this order
            </h2>
            <ul class="divide-y">
              <li
                v-for="item in order.items"
                :key="item.id"
                class="py-4 flex items-center justify-between"
              >
                <div class="flex items-start gap-4">
                  <div
                    class="w-14 h-14 bg-gray-100 rounded-md flex items-center justify-center"
                  >
                    <svg
                      class="w-7 h-7 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M3 3h18v18H3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-800">
                      {{ item.name }}
                    </div>
                    <div class="text-xs text-gray-500">Qty: {{ item.qty }}</div>
                  </div>
                </div>
                <div class="text-sm font-semibold text-gray-800">
                  ৳ {{ (item.price * item.qty).toFixed(2) }}
                </div>
              </li>
            </ul>

            <div class="mt-4 flex justify-end items-center gap-4">
              <div class="text-sm text-gray-500">Subtotal</div>
              <div class="text-lg font-semibold text-gray-800">
                ৳ {{ calcTotal(order.items) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Order Summary & Actions -->
        <aside class="space-y-6">
          <div class="bg-white rounded-xl p-6">
            <h3 class="text-md font-semibold text-gray-800 mb-3">
              Order Summary
            </h3>
            <div class="text-sm text-gray-600 space-y-2">
              <div class="flex justify-between">
                <span>Order ID</span
                ><span class="font-medium text-gray-800">{{ order.id }}</span>
              </div>
              <div class="flex justify-between">
                <span>Placed</span
                ><span class="font-medium text-gray-800">{{
                  new Date(order.placed_at).toLocaleDateString()
                }}</span>
              </div>
              <div class="flex justify-between">
                <span>Payment</span
                ><span class="font-medium text-gray-800"
                  >{{ order.payment.method }} • {{ order.payment.status }}</span
                >
              </div>
              <div class="flex justify-between">
                <span>Items</span
                ><span class="font-medium text-gray-800">{{
                  order.items.length
                }}</span>
              </div>
              <div class="flex justify-between">
                <span>Shipping</span
                ><span class="font-medium text-gray-800">{{
                  order.shipping.provider
                }}</span>
              </div>
              <div
                class="pt-2 border-t border-gray-100 flex justify-between items-center"
              >
                <span class="text-sm text-gray-600">Total</span>
                <span class="text-xl font-bold"
                  >৳ {{ calcTotal(order.items) }}</span
                >
              </div>
            </div>

            <div class="mt-4 space-y-3">
              <button
                class="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-white py-2.5 font-medium hover:bg-primary/90 transition"
              >
                Download Invoice
              </button>

              <button
                class="w-full inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 py-2.5 font-medium text-gray-700 hover:shadow-sm"
              >
                Contact Support
              </button>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6">
            <h3 class="text-md font-semibold text-gray-800 mb-3">
              Delivery Address
            </h3>
            <p class="text-sm text-gray-700 font-medium">
              {{ order.customer.name }}
            </p>
            <p class="text-sm text-gray-500">{{ order.customer.phone }}</p>
            <p class="text-sm text-gray-500 mt-2">
              {{ order.customer.address }}
            </p>
            <div class="mt-3">
              <button class="text-sm text-primary hover:underline">
                Change Address
              </button>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6">
            <h3 class="text-md font-semibold text-gray-800 mb-3">Shipment</h3>
            <div class="flex items-center gap-3">
              <img
                src="/redx.png"
                alt="RedX"
                class="h-8 w-auto object-contain"
              />
              <div>
                <div class="text-sm font-medium">
                  {{ order.shipping.provider }}
                </div>
                <div class="text-xs text-gray-500">
                  Tracking:
                  <span class="font-medium text-gray-700">{{
                    order.shipping.tracking_id
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
