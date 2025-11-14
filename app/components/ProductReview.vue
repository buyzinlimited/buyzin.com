<script setup>
const route = useRoute();
const reviewStore = useReviewStore();

const reviews = ref([]);

const loadReviews = async () => {
  const response = await reviewStore.getReviews(route.params.sku);
  reviews.value = response.data;
};

onMounted(() => {
  loadReviews();
});
</script>

<template>
  <div class="max-w-4xl bg-white">
    <!-- Header -->
    <h2 class="text-2xl font-bold mb-6">Reviews</h2>

    <!-- Overall Rating -->
    <div class="flex items-start gap-8">
      <!-- Average Rating -->
      <div class="text-center">
        <div class="text-4xl font-bold text-primary">
          {{ reviews?.average_rating }}
        </div>
        <div class="flex items-center gap-1 text-yellow-500">
          <template v-for="i in 5" :key="i">
            <IconsIconStarFill
              v-if="i <= Math.floor(reviews?.average_rating)"
              class="size-5 icon__star filled"
            />
            <IconsIconStar v-else class="size-5 icon__star" />
          </template>
        </div>
        <div class="text-sm text-gray-500 mt-1">
          {{ reviews?.total_reviews }} ratings
        </div>
      </div>

      <div class="flex-1 space-y-1">
        <template v-for="(count, star) in reviews.ratings" :key="star">
          <div class="flex items-center text-sm text-gray-500 gap-2">
            <span>{{ star }}.0</span>
            <div class="bg-gray-200 rounded-full w-full h-2 relative">
              <div
                class="bg-primary h-2 rounded-full absolute left-0 top-0"
                :style="{ width: (count / reviews?.total_reviews) * 100 + '%' }"
              ></div>
            </div>
            <span>{{ count }}</span>
          </div>
        </template>
      </div>
    </div>

    <!-- Review List -->
    <div class="mt-8 space-y-6">
      <template v-if="reviews.data">
        <div
          v-for="review in reviews.data"
          :key="review.id"
          class="border border-gray-200 rounded-xl p-4 transition duration-200"
        >
          <!-- Header: User + Verified + Rating -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img
                :src="review.user?.photo_url"
                :alt="review.user?.name"
                class="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-semibold text-gray-800">{{
                    review.user?.name
                  }}</span>
                  <span
                    v-if="review.is_verified_purchase"
                    class="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium"
                    >Verified</span
                  >
                </div>
                <span class="text-gray-400 text-sm">{{
                  review.created_at?.human
                }}</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-semibold text-gray-800">{{
                review.rating.toFixed(1)
              }}</span>
              <div class="flex items-center gap-0.5">
                <template v-for="i in 5" :key="i">
                  <IconsIconStarFill
                    v-if="i <= Math.floor(review?.rating)"
                    class="w-4 h-4 text-yellow-400"
                  />
                  <IconsIconStar v-else class="w-4 h-4 text-gray-300" />
                </template>
              </div>
            </div>
          </div>

          <div
            class="text-gray-700 mt-3 text-sm leading-relaxed"
            v-html="review.review"
          ></div>

          <div
            v-if="review.images && review.images.length"
            class="flex gap-2 mt-4 overflow-x-auto"
          >
            <img
              v-for="(img, idx) in review.images"
              :key="idx"
              :src="img"
              alt="Review Image"
              class="h-16 w-16 object-cover rounded-lg shrink-0 border border-gray-200 p-1"
            />
          </div>

          <!-- Helpful / Not Helpful -->
          <div class="flex gap-4 mt-4 text-gray-500 text-sm">
            <UButton icon="i-lucide-thumbs-up" color="cyan" variant="subtle">
              <span class="hover:text-primary transition">{{
                review.helpful_count
              }}</span>
            </UButton>

            <UButton icon="i-lucide-thumbs-down" color="cyan" variant="subtle">
              <span class="hover:text-primary transition">{{
                review.not_helpful_count
              }}</span>
            </UButton>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
