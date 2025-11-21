<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
});

// Toggle for child menu
const isOpen = ref(false);

const toggle = () => {
  if (props.item.children && props.item.children.length > 0) {
    isOpen.value = !isOpen.value;
  }
};
</script>

<template>
  <li>
    <div
      class="flex items-center justify-between cursor-pointer select-none py-2 px-3 hover:bg-gray-100 rounded-lg"
      @click="toggle"
    >
      <!-- Left side: image + name -->
      <div class="flex items-center gap-2">
        <img
          v-if="item.image_url"
          :src="item.image_url"
          class="w-6 h-6 rounded object-cover"
        />

        <span class="text-sm font-medium">
          {{ item.name }}
        </span>
      </div>

      <!-- Right Arrow -->
      <div v-if="item.children && item.children.length">
        <ChevronDown v-if="isOpen" class="w-4 h-4" />
        <ChevronRight v-else class="w-4 h-4" />
      </div>
    </div>

    <!-- Children -->
    <ul
      v-if="item.children && item.children.length"
      class="ml-6 mt-1 space-y-1"
      v-show="isOpen"
    >
      <NavigationItem
        v-for="child in item.children"
        :key="child.id"
        :item="child"
      />
    </ul>
  </li>
</template>

<style scoped></style>
