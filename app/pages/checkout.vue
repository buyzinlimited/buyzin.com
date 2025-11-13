<script setup>
import { reactive } from "vue";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
const checkoutStore = useCheckoutStore();
const { items, coupon, subtotal, discount, shipping, tax, total } =
  storeToRefs(cartStore);

const form = reactive({
  payment_method: "cod",
  note: "Delivery note",
  createAccount: true,
  email: "ashik@example.com",
  password: "password",
  address: {
    name: "Ashik Ahmed",
    phone: "019xxxxxxxx",
    email: "ashik@example.com",
    address: "House 14, Road 8, Sector 7",
    city: "Dhaka",
    state: "Dhaka",
    postal_code: "5640",
    country: "Bangladesh",
  },
});

const gateways = [
  { key: "cod", name: "Cash On Delivery", logo_url: "/logo/cod.png" },
  { key: "bkash", name: "Bkash", logo_url: "/logo/bkash.png" },
];

// Order Summary (auto-filled from Pinia)
const orderSummary = computed(() => ({
  subtotal: subtotal.value,
  discount: discount.value,
  shipping: shipping.value,
  tax: tax.value,
  total: total.value,
}));

// Submit Order
const submit = async () => {
  if (!form.address.name || !form.address.phone || !form.address.address) {
    toast("Please fill in required shipping fields.", "error");
    return;
  }

  if (!form.payment_method) {
    toast("Please select a payment method.", "error");
    return;
  }

  const payload = {
    subtotal: orderSummary.value.subtotal,
    discount: orderSummary.value.discount,
    shipping: orderSummary.value.shipping,
    tax: orderSummary.value.tax,
    total: orderSummary.value.total,
    payment_method: form.payment_method,
    note: form.note,
    address: form.address,
    items: items.value,
    coupon: coupon.value,
    createAccount: form.createAccount,
    email: form.email,
    password: form.password,
  };

  await checkoutStore.process(payload);
};
</script>

<template>
  <SeoMeta
    title="Checkout | Buyzin - Secure Payment & Fast Delivery in Bangladesh"
    description="Complete your purchase on Buyzin with a secure and easy checkout process. Pay online, review your order, and enjoy fast delivery across Bangladesh."
    keywords="checkout, secure payment, online shopping, ecommerce, Buyzin, Bangladesh, fast delivery, order review, complete purchase"
  />

  <main class="max-w-7xl mx-auto py-4">
    <div class="flex flex-wrap items-start gap-4">
      <!-- Shipping Info -->
      <div class="card grow">
        <div class="card__header">
          <h3 class="card__title">Shipping Address</h3>
        </div>

        <div class="card__body space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form__group">
              <label class="form__label">Full Name</label>
              <input
                type="text"
                v-model="form.address.name"
                class="form__control"
                placeholder="Enter full name"
              />
            </div>
            <div class="form__group">
              <label class="form__label">Phone Number</label>
              <input
                type="text"
                v-model="form.address.phone"
                class="form__control"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div class="form__group">
            <label class="form__label">Address</label>
            <input
              type="text"
              v-model="form.address.address"
              class="form__control"
              placeholder="Street address"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="form__group">
              <label class="form__label">City</label>
              <input
                type="text"
                v-model="form.address.city"
                class="form__control"
                placeholder="City"
              />
            </div>
            <div class="form__group">
              <label class="form__label">State/Province</label>
              <input
                type="text"
                v-model="form.address.state"
                class="form__control"
                placeholder="State / Province"
              />
            </div>
            <div class="form__group">
              <label class="form__label">Postal Code</label>
              <input
                type="text"
                v-model="form.address.postal_code"
                class="form__control"
                placeholder="Postal code"
              />
            </div>
          </div>

          <div class="form__group">
            <label class="form__label">Notes</label>
            <textarea
              v-model="form.note"
              class="form__control"
              rows="5"
              placeholder="Any special instructions for delivery? (optional)"
            >
            </textarea>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="flex-none w-full max-w-md">
        <div class="card">
          <div class="card__header">
            <h3 class="card__title">Order Summary</h3>
          </div>

          <div class="card__body divide-y divide-dashed">
            <!-- Cart Items -->
            <div class="space-y-2 py-4">
              <div
                v-for="item in items"
                :key="item.id"
                class="flex items-center justify-between"
              >
                <div class="flex items-center gap-2">
                  <img
                    :src="item.image_url"
                    class="w-12 h-12 object-cover rounded-md border"
                    :alt="item.name"
                  />
                  <div class="flex flex-col">
                    <span class="text-sm font-medium">{{ item.name }}</span>
                    <div class="flex flex-wrap text-sm">
                      <span
                        class="after:content-['•'] after:mx-2 last:after:content-none"
                      >
                        Quantity: {{ item.quantity }}
                      </span>
                      <span
                        class="after:content-['•'] after:mx-2 last:after:content-none"
                      >
                        SKU: {{ item.sku }}
                      </span>
                    </div>
                  </div>
                </div>
                <span class="font-semibold">
                  {{ $currency(item.price) }}
                </span>
              </div>
            </div>

            <!-- Payment Gateways -->
            <div class="py-4">
              <h3 class="font-semibold mb-2">Select Payment Method</h3>
              <div class="flex flex-wrap items-center gap-4">
                <label
                  v-for="method in gateways"
                  :key="method.key"
                  class="border-2 rounded-xl cursor-pointer transition"
                  :class="
                    form.payment_method === method.key
                      ? 'border-primary'
                      : 'border-border'
                  "
                >
                  <input
                    type="radio"
                    name="payment"
                    class="hidden"
                    :value="method.key"
                    v-model="form.payment_method"
                  />
                  <img
                    :src="method.logo_url"
                    :alt="method.name"
                    class="h-16 w-auto rounded-xl p-1"
                  />
                </label>
              </div>
            </div>

            <!-- Total -->
            <div class="space-y-3 py-4">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span>{{ $currency(orderSummary.subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Discount</span>
                <span>{{ $currency(orderSummary.discount) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Shipping</span>
                <span>{{ $currency(orderSummary.shipping) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Tax</span>
                <span>{{ $currency(orderSummary.tax) }}</span>
              </div>
              <div class="flex justify-between font-semibold">
                <span>Total</span>
                <span>{{ $currency(orderSummary.total) }}</span>
              </div>
            </div>

            <BaseButton @click="submit" :loading="checkoutStore.loading"
              >Place Order
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
