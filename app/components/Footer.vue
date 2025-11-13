<script setup>
import { ref, onMounted } from "vue";

const currentYear = ref(null);

onMounted(() => {
  currentYear.value = new Date().getFullYear();
});
</script>

<template>
  <footer class="bg-white">
    <div class="bg-primary text-white py-8 md:py-10 lg:py-12">
      <div class="container mx-auto px-4">
        <h3 class="font-semibold text-xl">
          More brands than any other fashion retailer
        </h3>
        <span class="text-xs">
          Explore almost 2,000 brands from High Street to High End-Free Shipping
          & Returns
        </span>
      </div>
    </div>
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
        <div class="flex w-full flex-col items-start">
          <NuxtLink to="/" class="mb-3">
            <img src="/logo.svg" alt="logo" class="h-16 object-cover w-auto" />
          </NuxtLink>
          <p class="text-body">
            Shop Smart. Live Easy. We are committed to providing 100% genuine
            and authentic products at the best prices. Our mission is to make
            your shopping experience easy, fast, and hassle-free. Trust in
            Buyzin for all your needs.
          </p>
          <div class="py-4">
            <h3 class="text-base font-semibold leading-6 text-gray-900 mb-2">
              Payment & Shipping
            </h3>
            <div class="flex flex-wrap items-center gap-3">
              <img
                src="/pci-dss.png"
                alt="PCI-DSS"
                class="max-h-10 w-auto object-contain"
              />

              <img
                src="/dhl.png"
                alt="DHL"
                class="max-h-10 w-auto object-contain"
              />

              <img
                src="/redx.png"
                alt="RedX"
                class="max-h-10 w-auto object-contain"
              />
            </div>
          </div>
        </div>

        <div class="w-full">
          <div class="grid grid-cols-2 md:grid-cols-2 gap-8">
            <!-- Company Section -->
            <div class="w-full">
              <h3 class="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                Information
              </h3>
              <ul class="space-y-2">
                <li class="flex items-center group">
                  <IconsIconChevronDoubleRight
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/faq"
                    class="group-hover:text-primary transition-colors duration-200"
                  >
                    FAQ
                  </NuxtLink>
                </li>

                <li class="flex items-center group">
                  <IconsIconChevronDoubleRight
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/privacy-policy"
                    class="group-hover:text-primary transition-colors duration-200"
                  >
                    Privacy Policy
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <IconsIconChevronDoubleRight
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/return-policy"
                    class="group-hover:text-primary transition-colors duration-200"
                  >
                    Return Policy
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <IconsIconChevronDoubleRight
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/terms-and-conditions"
                    class="group-hover:text-primary transition-colors duration-200"
                  >
                    Terms & Conditions
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <IconsIconChevronDoubleRight
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/cookie-settings"
                    class="group-hover:text-primary transition-colors duration-200"
                  >
                    Cookie Settings
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <IconsIconChevronDoubleRight
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/shipping-delivery"
                    class="group-hover:text-primary transition-colors duration-200"
                  >
                    Shipping & Delivery
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Useful Links Section -->
            <div class="w-full">
              <h3 class="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                Our Company
              </h3>
              <ul class="space-y-2">
                <li class="flex items-center group">
                  <icons-icon-chevron-double-right
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/profile"
                    class="hover:text-primary transition-colors duration-200"
                  >
                    My Account
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <icons-icon-chevron-double-right
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/orders"
                    class="hover:text-primary transition-colors duration-200"
                  >
                    My Orders
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <icons-icon-chevron-double-right
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/orders/tracking"
                    class="hover:text-primary transition-colors duration-200"
                  >
                    Order Tracking
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <icons-icon-chevron-double-right
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/about"
                    class="hover:text-primary transition-colors duration-200"
                  >
                    About Us
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <icons-icon-chevron-double-right
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/contact"
                    class="hover:text-primary transition-colors duration-200"
                  >
                    Contact Us
                  </NuxtLink>
                </li>

                <li class="flex items-center group">
                  <icons-icon-chevron-double-right
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/apply-vendor"
                    class="hover:text-primary transition-colors duration-200"
                  >
                    Become an Vendor
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full">
          <div class="block">
            <h3
              class="mb-4 text-base font-semibold md:text-xl md:font-bold text-gray-800"
            >
              Help & Contact
            </h3>

            <div class="space-y-3">
              <!-- Address -->
              <div class="group flex items-start gap-3">
                <icons-icon-location class="size-6 text-body" />
                <address class="text-body hover:text-primary">
                  419 State 414 Rte Beaver Dams,<br />
                  New York(NY), 14812, USA
                </address>
              </div>

              <!-- Phone -->
              <div class="flex items-center gap-3">
                <icons-icon-support class="size-6 text-body" />
                <a
                  href="tel:(607) 936-8058"
                  class="text-body hover:text-primary"
                  >(607) 936-8058 <br />
                  (607) 936-8058</a
                >
              </div>

              <!-- Email -->
              <div class="flex items-center gap-3">
                <icons-icon-email class="size-6 text-body hover:text-primary" />
                <a
                  href="mailto:abutoha096@gmail.com"
                  class="text-body hover:text-primary"
                  >support@redpointbd.com <br />
                  admin@example.com</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-100 text-center py-4">
      <div class="container mx-auto">
        <p class="text-sm font-normal text-gray-600">
          © {{ currentYear }} <a href="/" class="text-primary">Buyzin</a> - All
          rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
