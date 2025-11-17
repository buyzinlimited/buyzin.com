<script setup>
import ProfileLayout from "~/components/ProfileLayout.vue";

const profileStore = useProfileStore();

const form = reactive({
  name: "",
  phone: "",
  email: "",
});

const loadProfile = async () => {
  const response = await profileStore.getProfile();
  form.name = response.data.name;
  form.phone = response.data.phone;
  form.email = response.data.email;
};

const updateProfile = async () => {
  await profileStore.update(form);
};

onMounted(() => {
  loadProfile();
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
      </div>
      <div class="card__body">
        <form @submit.prevent="updateProfile" class="max-w-3xl">
          <div class="grid grid-cols-1 gap-4">
            <BaseInput
              label="Full Name"
              v-model="form.name"
              placeholder="Enter full name"
              error=""
              :required="true"
            />

            <BaseInput
              label="Phone Number"
              v-model="form.phone"
              placeholder="Enter phone"
              error=""
              :required="true"
            />

            <BaseInput
              label="Email"
              v-model="form.email"
              placeholder="Enter email"
              error=""
              :required="true"
            />
          </div>

          <div class="mt-6 flex justify-end">
            <BaseButton :loading="profileStore.loading"
              >Save Changes</BaseButton
            >
          </div>
        </form>
      </div>
    </div>
  </ProfileLayout>
</template>
