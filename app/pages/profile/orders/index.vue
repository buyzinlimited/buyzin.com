<script setup>
import ProfileLayout from "~/components/ProfileLayout.vue";

const profileStore = useProfileStore();

const orders = ref(null);
const page = ref(5);

const loadOrders = async () => {
  const response = await profileStore.getOrders();
  orders.value = response.data;
};

onMounted(() => {
  loadOrders();
});
</script>

<template>
  <ProfileLayout>
    <SeoMeta
      title="My Orders | Buyzin - Track Your Online Orders in Bangladesh"
      description="View and track all your Buyzin orders easily. Check order status, shipment details, delivery updates, and past purchase history."
      keywords="Buyzin orders, order tracking Bangladesh, online shopping, order status, ecommerce orders BD"
    />
    <div class="card">
      <div class="card__header">
        <h3 class="card__title">Orders</h3>
      </div>
      <div class="card__body">
        <template v-if="orders?.data">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Subtotal</th>
                <th>Total</th>
                <th>Status</th>
                <th>Method</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders?.data">
                <th>#{{ order?.order_number }}</th>
                <td>
                  {{ order.currency_symbol
                  }}{{ Number(order.subtotal).toFixed(0) }}
                </td>

                <td>
                  {{ order.currency_symbol
                  }}{{ Number(order.total).toFixed(0) }}
                </td>
                <td>
                  <span
                    v-if="order.status"
                    :class="[
                      'badge',
                      {
                        badge__primary: order.status === 'pending',
                        badge__secondary: order.status === 'confirmed',
                        badge__warning: order.status === 'processing',
                        badge__info: order.status === 'shipped',
                        badge__success: order.status === 'delivered',
                        badge__danger: order.status === 'cancelled',
                        badge__dark: order.status === 'returned',
                      },
                    ]"
                  >
                    {{ order.status }}
                  </span>
                </td>
                <td>
                  <span
                    v-if="order.payment_method"
                    :class="[
                      'badge',
                      {
                        badge__primary: order.payment_method === 'sslcommerz',
                        badge__success: order.payment_method === 'bkash',
                        badge__warning: order.payment_method === 'nagad',
                        badge__secondary: order.payment_method === 'cod',
                        badge__info: order.payment_method === 'manual',
                      },
                    ]"
                  >
                    {{ order.payment_method }}
                  </span>
                </td>
                <td>
                  <span
                    v-if="order.payment_status"
                    :class="[
                      'badge',
                      {
                        badge__warning: order.payment_status === 'unpaid',
                        badge__success: order.payment_status === 'paid',
                        badge__danger: order.payment_status === 'failed',
                        badge__secondary: order.payment_status === 'refunded',
                      },
                    ]"
                  >
                    {{ order.payment_status }}
                  </span>
                </td>
                <td>
                  <NuxtLink
                    :to="`/profile/orders/${order.order_number}`"
                    class="badge badge__primary"
                  >
                    View
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex items-end justify-end py-4">
            <UPagination v-model:page="page" :total="100" />
          </div>
        </template>
        <template v-else>
          <UEmpty />
        </template>
      </div>
    </div>
  </ProfileLayout>
</template>

<style scoped></style>
