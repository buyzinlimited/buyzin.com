<script setup>
import ProfileLayout from "~/components/ProfileLayout.vue";
</script>

<template>
  <ProfileLayout>
    <SeoMeta
      title="My Addresses | Buyzin - Manage Your Shipping & Billing Addresses"
      description="Easily manage your shipping and billing addresses on Buyzin. Add new addresses, edit existing ones, and enjoy faster checkout across Bangladesh."
      keywords="Buyzin address book, manage addresses, shipping address Bangladesh, billing address BD, ecommerce address management"
    />

    <div class="card">
      <div class="card__header">
        <h3 class="card__title">Address</h3>
      </div>
      <div class="card__body">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div class="bg-white p-4 rounded-xl border border-border">
            <h4
              class="text-lg font-semibold mb-4 flex justify-between items-center"
            >
              Billing Address
              <button class="text-primary font-medium hover:underline">
                Edit
              </button>
            </h4>
            <p>Daniel Robinson</p>
            <p>1418 River Drive, Suite 35 Cottonhall, CA 9622</p>
            <p>United States</p>
            <p class="mt-6">sale@zenmart.com</p>
            <p>+3 8493 92 932 021</p>
          </div>
        </div>
      </div>
    </div>
  </ProfileLayout>
</template>

<style scoped></style>
