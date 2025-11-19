<script setup>
const route = useRoute();
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 py-6">
    <header class="bg-white rounded-xl mb-4">
      <div
        class="flex flex-wrap gap-6 items-center justify-center md:justify-stretch rounded-xl overflow-hidden p-6"
      >
        <div class="p-2">
          <NuxtImg
            src="/logo-social.png"
            alt="vendor"
            loading="lazy"
            class="bg-cyan-100 p-2.5 rounded-full w-40 h-40 object-cover"
          />
        </div>

        <div class="space-y-2.5">
          <h2 class="flex items-center gap-2 text-2xl font-bold">
            Buyzin — Official Store
            <IconsIconBadgeCheck class="size-5 text-blue-500" />
          </h2>
          <p class="mt-2 text-gray-600">
            We curate high-quality products with fast shipping and excellent
            customer support. Trusted by thousands of happy customers.
          </p>

          <div class="flex flex-wrap items-center">
            <div
              class="flex items-center after:content-['•'] after:mx-2 last:after:content-none"
            >
              4.8 (2.3k reviews)
            </div>
            <div
              class="flex items-center after:content-['•'] after:mx-2 last:after:content-none"
            >
              Ships worldwide
            </div>
            <div
              class="flex items-center after:content-['•'] after:mx-2 last:after:content-none"
            >
              Return 30 days
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="p-3">
              <div class="text-xs text-gray-500">Followers</div>
              <div class="text-lg font-semibold">12.4k</div>
            </div>
            <div class="p-3 bg-gray-50 rounded">
              <div class="text-xs text-gray-500">Avg ship</div>
              <div class="text-lg font-semibold">2 days</div>
            </div>
            <div class="p-3 bg-gray-50 rounded">
              <div class="text-xs text-gray-500">Response</div>
              <div class="text-lg font-semibold">95%</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="bg-white rounded-xl px-4 py-6">
      {{ route.params }}

      <div class="bg-white py-4 rounded-xl">
        <Tabs
          :tabs="[
            { label: 'Products', slot: 'products' },
            { label: 'Abount', slot: 'about' },
            { label: 'Reviews', slot: 'reviews' },
          ]"
        >
          <template #products> Products </template>
          <template #about> Abount </template>
          <template #reviews> Reviews </template>
        </Tabs>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
