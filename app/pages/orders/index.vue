<script setup>
import { ref } from "vue";

// Dummy orders data
const orders = ref([
  {
    id: 101,
    date: "2025-11-03",
    total: "$120.00",
    status: "Pending",
    items: 3,
  },
  {
    id: 102,
    date: "2025-10-28",
    total: "$75.50",
    status: "Shipped",
    items: 1,
  },
  {
    id: 103,
    date: "2025-10-25",
    total: "$200.00",
    status: "Delivered",
    items: 5,
  },
]);

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};
</script>

<template>
  <SeoMeta
    title="My Orders | Buyzin - Track & Manage Your Orders in Bangladesh"
    description="View and manage all your orders on Buyzin. Track shipping status, check delivery times, and review past purchases. Shop confidently with Buyzin in Bangladesh."
    keywords="Buyzin orders, order tracking Bangladesh, online shopping order status, ecommerce order history, Buyzin purchase management, track shipments Bangladesh"
  />

  <div class="container mx-auto py-4">
    <div class="bg-white rounded-2xl px-6 py-8">
      <h3 class="text-2xl font-bold mb-6">My Orders</h3>

      <!-- Search / Filter -->
      <div
        class="flex flex-col md:flex-row items-center justify-between mb-6 gap-4"
      >
        <input
          type="text"
          placeholder="Search orders..."
          class="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
        />

        <select
          class="w-full md:w-1/4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
        >
          <option value="">Filter by status</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <!-- Orders Table -->
      <div class="overflow-x-auto bg-white shadow rounded-lg">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-sm font-semibold text-gray-700">
                Order ID
              </th>
              <th class="px-4 py-3 text-sm font-semibold text-gray-700">
                Date
              </th>
              <th class="px-4 py-3 text-sm font-semibold text-gray-700">
                Items
              </th>
              <th class="px-4 py-3 text-sm font-semibold text-gray-700">
                Total
              </th>
              <th class="px-4 py-3 text-sm font-semibold text-gray-700">
                Status
              </th>
              <th class="px-4 py-3 text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in orders"
              :key="order.id"
              class="border-t hover:bg-gray-50 transition"
            >
              <td class="px-4 py-3 text-sm font-medium text-gray-800">
                #{{ order.id }}
              </td>
              <td class="px-4 py-3 text-sm text-gray-600">{{ order.date }}</td>
              <td class="px-4 py-3 text-sm text-gray-600">{{ order.items }}</td>
              <td class="px-4 py-3 text-sm text-gray-800 font-semibold">
                {{ order.total }}
              </td>
              <td class="px-4 py-3">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    statusColors[order.status],
                  ]"
                >
                  {{ order.status }}
                </span>
              </td>
              <td class="px-4 py-3">
                <NuxtLink
                  :to="`/orders/${order.id}`"
                  class="text-primary font-medium hover:underline"
                >
                  View
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
