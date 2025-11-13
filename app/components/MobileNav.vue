<script setup>
import { useCategoryStore } from "@/stores/category";

const categoryStore = useCategoryStore();
const openSubmenu = ref(null);
const categories = ref([]);

const loadCategories = async () => {
  const response = await categoryStore.getCategories();
  categories.value = response;
};

onMounted(() => {
  loadCategories();
});

defineProps({
  isOpen: Boolean,
});
defineEmits(["close"]);

// Toggle submenu by category id
function toggleSubmenu(id) {
  openSubmenu.value = openSubmenu.value === id ? null : id;
}

const navigation = ref([
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    children: [
      { id: 11, name: "Mobile Phones", slug: "mobile-phones" },
      { id: 12, name: "Laptops", slug: "laptops" },
      { id: 13, name: "Headphones", slug: "headphones" },
      { id: 14, name: "Smart Watches", slug: "smart-watches" },
    ],
  },
  {
    id: 2,
    name: "Fashion",
    slug: "fashion",
    children: [
      { id: 21, name: "Men's Clothing", slug: "mens-clothing" },
      { id: 22, name: "Women's Clothing", slug: "womens-clothing" },
      { id: 23, name: "Shoes", slug: "shoes" },
      { id: 24, name: "Accessories", slug: "accessories" },
    ],
  },
  {
    id: 3,
    name: "Home & Kitchen",
    slug: "home-kitchen",
    children: [
      { id: 31, name: "Furniture", slug: "furniture" },
      { id: 32, name: "Appliances", slug: "appliances" },
      { id: 33, name: "Decor", slug: "decor" },
      { id: 34, name: "Cookware", slug: "cookware" },
    ],
  },
  {
    id: 4,
    name: "Beauty & Health",
    slug: "beauty-health",
    children: [
      { id: 41, name: "Skincare", slug: "skincare" },
      { id: 42, name: "Makeup", slug: "makeup" },
      { id: 43, name: "Personal Care", slug: "personal-care" },
    ],
  },
  {
    id: 5,
    name: "Groceries",
    slug: "groceries",
    children: [
      { id: 51, name: "Fruits & Vegetables", slug: "fruits-vegetables" },
      { id: 52, name: "Beverages", slug: "beverages" },
      { id: 53, name: "Snacks", slug: "snacks" },
      { id: 54, name: "Dairy Products", slug: "dairy-products" },
    ],
  },
]);
</script>

<template>
  <aside class="fixed inset-0 bg-black z-40 transition-opacity">
    <div class="flex justify-between items-center p-4 border-b">
      <h2 class="font-semibold text-lg">Menu</h2>
      <button @click="toggleSidebar" class="text-gray-600 hover:text-gray-900">
        ✕
      </button>
    </div>
    <nav class="p-4 space-y-2">
      <a href="/" class="block py-2 px-3 rounded hover:bg-gray-100">Home</a>
      <a href="/categories" class="block py-2 px-3 rounded hover:bg-gray-100"
        >Categories</a
      >
      <a href="/wishlist" class="block py-2 px-3 rounded hover:bg-gray-100"
        >Wishlist</a
      >
      <a href="/orders" class="block py-2 px-3 rounded hover:bg-gray-100"
        >Orders</a
      >
      <a href="/profile" class="block py-2 px-3 rounded hover:bg-gray-100"
        >Profile</a
      >
    </nav>
  </aside>
  <nav
    class="overflow-y-auto scrollbar w-full bg-white border-t border-border z-40"
  >
    <!-- Main Menu -->
    <ul class="px-4 space-y-2 mb-3">
      <li v-for="item in categories.data" :key="item.id" class="relative">
        <!-- Main Category Button -->
        <button
          class="w-full flex items-center justify-between px-3 py-2 font-medium text-gray-800 rounded hover:bg-gray-100"
          @click="toggleSubmenu(item.id)"
        >
          <span class="flex-1 text-left">
            <a
              v-if="item.children?.length"
              :href="`/categories/${item.slug}`"
              class="block w-full"
            >
              {{ item.name }}
            </a>
            <span v-else>
              {{ item.name }}
            </span>
          </span>
          <IconsIconChevronDown
            v-if="item.children?.length"
            class="w-4 h-4 text-gray-600"
          />
        </button>

        <!-- Submenu (for mobile) -->
        <transition name="fade">
          <div v-if="openSubmenu === item.id" class="pl-4 mt-1 space-y-1">
            <ul class="space-y-1">
              <li v-for="child in item.children" :key="child.id">
                <a
                  :href="`/categories/${child.slug}`"
                  class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  {{ child.name }}
                </a>
              </li>
            </ul>
          </div>
        </transition>
      </li>
    </ul>

    <!-- Static Links -->
    <ul class="px-4 space-y-2">
      <li>
        <a
          href="/contact"
          class="block px-3 py-2 text-base font-medium text-gray-800 rounded hover:bg-gray-100"
          >Contact</a
        >
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
