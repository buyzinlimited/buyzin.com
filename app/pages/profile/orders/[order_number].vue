<script setup>
import ProfileLayout from "~/components/ProfileLayout.vue";

const profileStore = useProfileStore();
const route = useRoute();

const order = ref(null);

const loadOrder = async () => {
  const response = await profileStore.getOrder(route.params.order_number);
  console.log(response.data);
  order.value = response.data;
};

onMounted(() => {
  loadOrder();
});

const steps = ref([
  {
    title: "Pending",
    description: "Order has been placed",
    icon: "i-lucide-package",
  },
  {
    title: "Confirmed",
    description: "Order confirmed by seller",
    icon: "i-lucide-check-circle",
  },
  {
    title: "Processing",
    description: "Preparing your order",
    icon: "i-lucide-loader",
  },
  {
    title: "Shipped",
    description: "Order is on the way",
    icon: "i-lucide-truck",
  },
  {
    title: "Delivered",
    description: "Order delivered to customer",
    icon: "i-lucide-home",
  },
  {
    title: "Cancelled",
    description: "Order has been cancelled",
    icon: "i-lucide-x-circle",
  },
  {
    title: "Returned",
    description: "Order has been returned",
    icon: "i-lucide-rotate-ccw",
  },
]);
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

  <ProfileLayout>
    <SeoMeta
      title="Order Details | Buyzin"
      description="View detailed information about your Buyzin order. Check order items, status, payment method, shipping address, and total amount."
    />

    <div class="flex flex-wrap gap-4">
      <div class="card grow p-4 rounded-xl">
        <div class="card__header">
          <h3 class="card__title">Order #: {{ order?.order_number }}</h3>
          <p class="text-gray-500 mb-4">Placed on: {{ order?.created_at }}</p>
        </div>
        <div class="card__body">
          <div class="">
            <div v-if="order" class="grow">
              <div class="flex flex-wrap gap-2 mb-4">
                <span class="font-medium text-gray-700">Status:</span>
                <span
                  :class="[
                    'badge',
                    {
                      badge__primary: order.status === 'pending',
                      badge__success: order.status === 'delivered',
                      badge__warning: order.status === 'processing',
                    },
                  ]"
                >
                  {{ order.status }}
                </span>

                <span class="font-medium text-gray-700 ml-4">Payment:</span>
                <span
                  :class="[
                    'badge',
                    {
                      badge__success: order.payment_status === 'paid',
                      badge__warning: order.payment_status === 'unpaid',
                    },
                  ]"
                >
                  {{ order.payment_status }}
                </span>

                <span class="font-medium text-gray-700 ml-4">Method:</span>
                <span
                  :class="[
                    'badge',
                    {
                      badge__primary: order.payment_method === 'sslcommerz',
                      badge__success: order.payment_method === 'bkash',
                    },
                  ]"
                >
                  {{ order.payment_method }}
                </span>
              </div>

              <UStepper orientation="vertical" :items="steps" class="w-full" />
            </div>
          </div>
        </div>
      </div>

      <div class="flex-none md:w-64 max-w-full space-y-4">
        <!-- Shipping Address -->
        <div class="bg-white rounded-xl">
          <div class="space-y-2.5 p-4">
            <div class="flex items-center gap-2 py-2 border-b">
              <IconsIconTruck class="size-5" />
              <h4 class="font-semibold text-heading">Shipping Address</h4>
            </div>

            <div v-if="order?.address" class="space-y-2">
              <div class="flex items-start">
                <div class="flex-none bg-green-200 rounded-xl p-2">
                  <NuxtImg
                    src="/icons/house.png"
                    alt="House"
                    class="size-8 rounded"
                  />
                </div>
                <div class="ml-2">
                  <h4 class="font-semibold">
                    {{ order?.address.name }}
                  </h4>
                  <span class="font-normal"> {{ order?.address.phone }}</span>
                </div>
              </div>
              <address class="text-sm">
                <p>{{ order.address.address }}</p>
                <p>
                  {{ order.address.city }}, {{ order.address.state }},
                  {{ order.address.postal_code }}
                </p>
                <p>
                  {{ order.address.country }}
                </p>
              </address>
            </div>
          </div>
        </div>

        <!-- Orders Items -->
        <div class="bg-white rounded-xl">
          <div class="space-y-2.5 p-4">
            <div class="flex items-center gap-2 py-2 border-b">
              <IconsIconList class="size-5" />
              <h4 class="font-semibold text-heading">Orders Items</h4>
            </div>

            <template v-if="order?.items">
              <div v-for="item in order.items" class="block">
                <div class="flex items-start gap-2">
                  <div class="flex-none rounded-xl">
                    <NuxtImg
                      :src="item.product?.image_url"
                      alt="House"
                      class="size-8 rounded"
                    />
                  </div>
                  <div class="grow">
                    <h4 class="text-sm font-semibold line-clamp-1">
                      {{ item.product?.name }}
                    </h4>
                    <div class="space-x-2 text-xs">
                      <span class="font-normal">
                        {{ item.price.toFixed(0) }}x{{ item.quantity }}
                      </span>

                      <span class="font-normal"
                        >{{ item.currency_symbol
                        }}{{ item.total.toFixed(0) }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </ProfileLayout>
</template>

<style scoped></style>
