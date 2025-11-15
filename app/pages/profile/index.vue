<script setup>
import ProfileLayout from "./ProfileLayout.vue";
const user = ref({
  name: "Ashik Ahmed",
  email: "ashik@example.com",
  phone: "+8801712345678",
  address: "House 22, Road 5, Dhanmondi, Dhaka",
});
</script>

<template>
  <ProfileLayout>
    <SeoMeta
      title="My Account | Buyzin - Manage Your Orders & Profile in Bangladesh"
      description="Access your Buyzin account to view orders, track shipments, manage your profile, and update your preferences. Enjoy seamless online shopping in Bangladesh."
      keywords="Buyzin My Account, account management Bangladesh, order tracking, profile settings, online shopping dashboard, ecommerce account Bangladesh"
    />

    <div class="card">
      <div class="card__header">
        <h3 class="card__title">Personal Information</h3>
        <button
          class="bg-primary px-2 py-1.5 text-sm rounded text-white flex items-center"
        >
          <IconsIconEdit class="size-5" />
          <span class="ml-2">Edit</span>
        </button>
      </div>
      <div class="card__body">
        <form class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            label="Full Name"
            v-model="user.name"
            placeholder="Enter full name"
            error=""
            :required="true"
          />

          <BaseInput
            label="Phone Number"
            v-model="user.phone"
            placeholder="Enter phone"
            error=""
            :required="true"
          />

          <BaseInput
            label="Email"
            v-model="user.email"
            placeholder="Enter email"
            error=""
            :required="true"
          />

          <BaseInput
            label="Address"
            v-model="user.address"
            placeholder="Enter address"
            error=""
            :required="true"
          />

          <BaseInput
            label="City"
            placeholder="Enter city"
            error=""
            :required="true"
          />

          <BaseInput
            label="Province / State"
            placeholder="Enter Province / State"
            error=""
            :required="true"
          />

          <BaseInput
            label="Postal Code"
            placeholder="Enter postal code"
            error=""
            :required="true"
          />

          <BaseInput
            label="Country"
            placeholder="Enter country"
            error=""
            :required="true"
          />
          <div class="mt-6 flex justify-end">
            <button
              type="button"
              class="bg-primary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-primary/90 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </ProfileLayout>
</template>
