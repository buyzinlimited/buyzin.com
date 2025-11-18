<script setup>
const route = useRoute();
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 py-6">
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
