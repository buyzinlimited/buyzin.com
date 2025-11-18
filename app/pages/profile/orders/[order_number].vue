<script setup>
import ProfileLayout from "~/components/ProfileLayout.vue";

const profileStore = useProfileStore();
const route = useRoute();
const order = ref(null);

const loadOrder = async () => {
  const response = await profileStore.getOrder(route.params.order_number);
  order.value = response.data;
};

onMounted(() => {
  loadOrder();
});
</script>

<template>
  <UBreadcrumb
    :items="[
      { label: 'Home', to: '/' },
      { label: 'My Account', to: '/profile' },
      { label: 'Orders', to: '/profile/orders' },
      { label: order?.order_number },
    ]"
    class="container mx-auto p-2.5"
  />

  <Head>
    <Title>Order Details | Buyzin</Title>
    <Meta
      name="description"
      content="View detailed information about your Buyzin order. Check order items, status, payment method, shipping address, and total amount."
    />
  </Head>

  <ProfileLayout>
    <template v-if="order === null">
      <div class="space-y-6 animate-pulse">
        <div class="bg-white rounded-xl p-4 space-y-4">
          <div class="h-6 bg-gray-200 rounded w-1/4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div class="h-32 bg-gray-200 rounded"></div>
            <div class="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-4 space-y-4">
          <div class="h-6 bg-gray-200 rounded w-1/4"></div>
          <div class="space-y-2">
            <div class="h-16 bg-gray-200 rounded"></div>
            <div class="h-16 bg-gray-200 rounded"></div>
            <div class="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-4 space-y-4">
          <div class="h-6 bg-gray-200 rounded w-1/4"></div>
          <div class="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="space-y-6">
        <!-- Order Summary -->
        <div class="bg-white rounded-xl">
          <div class="px-4 py-3 border-b border-border">
            <div class="border-b border-gray-200 pb-3 mb-4">
              <h3 class="text-lg font-semibold text-gray-800">
                Order #: {{ order?.order_number }}
              </h3>
              <p class="text-sm text-gray-500">
                Placed on: {{ order?.created_at }}
              </p>
            </div>
            <div class="flex flex-wrap gap-4 text-sm">
              <div class="space-x-2">
                <span class="font-medium">Status:</span>
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-white text-xs capitalize',
                    {
                      'bg-yellow-500': order?.status === 'pending',
                      'bg-green-500': order?.status === 'delivered',
                      'bg-blue-500': order?.status === 'processing',
                      'bg-red-500': order?.status === 'cancelled',
                    },
                  ]"
                >
                  {{ order?.status }}
                </span>
              </div>

              <div class="space-x-2">
                <span class="font-medium text-gray-700">Payment:</span>
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-white text-xs capitalize',
                    {
                      'bg-green-500': order?.payment_status === 'paid',
                      'bg-yellow-500': order?.payment_status === 'unpaid',
                      'bg-red-500': order?.payment_status === 'failed',
                    },
                  ]"
                >
                  {{ order?.payment_status }}
                </span>
              </div>

              <div class="space-x-2">
                <span class="font-medium text-gray-700">Method:</span>
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-white text-xs capitalize',
                    {
                      'bg-blue-500': order?.payment_method === 'sslcommerz',
                      'bg-green-500': order?.payment_method === 'bkash',
                      'bg-yellow-500': order?.payment_method === 'cod',
                    },
                  ]"
                >
                  {{ order?.payment_method }}
                </span>
              </div>
            </div>
          </div>
          <!-- Shipping & Billing -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div class="bg-white p-4">
              <div class="flex items-center gap-2 border-b pb-2 mb-3">
                <IconsIconTruck class="size-5 text-gray-600" />
                <h4 class="font-semibold text-gray-800">Shipping Address</h4>
              </div>

              <div v-if="order?.shipment?.shipping_address" class="space-y-2">
                <p class="font-medium text-gray-700">
                  {{ order.shipment.customer_name }}
                </p>
                <p class="text-gray-600">{{ order.shipment.customer_phone }}</p>
                <address class="text-gray-600 text-sm not-italic">
                  {{ order.shipment.shipping_address.address_line_1 }},
                  {{ order.shipment.shipping_address.address_line_2 }}<br />
                  {{ order.shipment.shipping_address.city }},
                  {{ order.shipment.shipping_address.state }},
                  {{ order.shipment.shipping_address.postal_code }}<br />
                  {{ order.shipment.shipping_address.country }}
                </address>
              </div>
            </div>

            <div class="bg-white p-4">
              <div class="flex items-center gap-2 border-b pb-2 mb-3">
                <IconsIconTruck class="size-5 text-gray-600" />
                <h4 class="font-semibold text-gray-800">Billing Address</h4>
              </div>

              <div v-if="order?.shipment?.billing_address" class="space-y-2">
                <p class="font-medium text-gray-700">
                  {{ order.shipment.customer_name }}
                </p>
                <p class="text-gray-600">{{ order.shipment.customer_phone }}</p>
                <address class="text-gray-600 text-sm not-italic">
                  {{ order.shipment.billing_address.address_line_1 }},
                  {{ order.shipment.billing_address.address_line_2 }}<br />
                  {{ order.shipment.billing_address.city }},
                  {{ order.shipment.billing_address.state }},
                  {{ order.shipment.billing_address.postal_code }}<br />
                  {{ order.shipment.billing_address.country }}
                </address>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="bg-white rounded-xl p-4">
          <div class="flex items-center gap-2 border-b pb-2 mb-3">
            <IconsIconList class="size-5 text-gray-600" />
            <h4 class="font-semibold text-gray-800">Order Items</h4>
          </div>

          <div v-if="order?.items" class="space-y-4">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="flex items-center gap-3 border-b border-gray-100 pb-2"
            >
              <NuxtImg
                :src="item.product.image_url"
                :alt="item.product.name"
                class="w-16 h-16 object-cover rounded"
              />
              <div class="flex-1">
                <h5 class="text-sm font-semibold text-gray-800 line-clamp-1">
                  {{ item.product.name }}
                </h5>
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <span>{{ item.price.toFixed(0) }} x {{ item.quantity }}</span>
                  <span class="font-medium"
                    >{{ item.currency_symbol }}{{ item.total.toFixed(0) }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Shipment Tracking -->
        <div v-if="order?.shipment" class="bg-white rounded-xl p-4">
          <div class="flex items-center gap-2 border-b pb-2 mb-3">
            <IconsIconTruck class="size-5 text-gray-600" />
            <h4 class="font-semibold text-gray-800">Shipment Tracking</h4>
          </div>

          <div class="space-y-2 text-sm text-gray-700">
            <p>
              <span class="font-medium">Carrier:</span>
              {{ order.shipment.carrier }}
            </p>
            <p>
              <span class="font-medium">Tracking Number:</span>
              {{ order.shipment.tracking_number }}
            </p>
            <p>
              <span class="font-medium">Shipping Cost:</span>
              {{ order.shipment.shipping_cost }}
            </p>
            <p>
              <span class="font-medium">Weight:</span>
              {{ order.shipment.weight }} kg
            </p>
            <p>
              <span class="font-medium">Package Type:</span>
              {{ order.shipment.package_type }}
            </p>
            <p>
              <span class="font-medium">Estimated Delivery:</span>
              {{ order.shipment.estimated_delivery_date }}
            </p>
            <p>
              <span class="font-medium">Notes:</span> {{ order.shipment.notes }}
            </p>
            <p>
              <span class="font-medium">Status:</span>
              {{ order.shipment.status }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </ProfileLayout>
</template>

<style scoped></style>
