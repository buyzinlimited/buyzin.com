<script setup>
const form = ref({
  product_id: 1,
  user_id: 5,
  rating: 4.0,
  comment: "",
  categories: [
    { category: "cleanliness", rating: 4.0 },
    { category: "safety_security", rating: 4.0 },
    { category: "staff", rating: 4.0 },
    { category: "amenities", rating: 3.5 },
    { category: "location", rating: 3.0 },
    { category: "value", rating: 4.2 },
  ],
});
</script>

<template>
  <div class="max-w-4xl bg-white">
    <!-- Header -->
    <h2 class="text-2xl font-bold mb-6">Reviews</h2>

    <!-- Overall Rating -->
    <div class="flex items-start gap-8">
      <div class="text-center">
        <div class="text-4xl font-bold text-primary">4.0</div>
        <div class="flex items-center gap-1 text-yellow-500">
          <IconsIconStarFill class="size-5" />
          <IconsIconStarFill class="size-5" />
          <IconsIconStarFill class="size-5" />
          <IconsIconStarFill class="size-5" />
          <IconsIconStar class="size-5" />
        </div>
        <div class="text-sm text-gray-500 mt-1">35k ratings</div>
      </div>
      <div class="flex-1 space-y-1">
        <!-- Ratings bar -->
        <div class="flex items-center text-sm text-gray-500 gap-2">
          <span>5.0</span>
          <div class="bg-gray-200 rounded-full w-full h-2 relative">
            <div
              class="bg-primary h-2 rounded-full absolute left-0 top-0"
              style="width: 80%"
            ></div>
          </div>
          <span>14k</span>
        </div>
        <div class="flex items-center text-sm text-gray-500 gap-2">
          <span>4.0</span>
          <div class="bg-gray-200 rounded-full w-full h-2 relative">
            <div
              class="bg-primary h-2 rounded-full absolute left-0 top-0"
              style="width: 60%"
            ></div>
          </div>
          <span>6k</span>
        </div>
        <div class="flex items-center text-sm text-gray-500 gap-2">
          <span>3.0</span>
          <div class="bg-gray-200 rounded-full w-full h-2 relative">
            <div
              class="bg-primary h-2 rounded-full absolute left-0 top-0"
              style="width: 40%"
            ></div>
          </div>
          <span>4k</span>
        </div>
        <div class="flex items-center text-sm text-gray-500 gap-2">
          <span>2.0</span>
          <div class="bg-gray-200 rounded-full w-full h-2 relative">
            <div
              class="bg-primary h-2 rounded-full absolute left-0 top-0"
              style="width: 20%"
            ></div>
          </div>
          <span>800</span>
        </div>
        <div class="flex items-center text-sm text-gray-500 gap-2">
          <span>1.0</span>
          <div class="bg-gray-200 rounded-full w-full h-2 relative">
            <div
              class="bg-primary h-2 rounded-full absolute left-0 top-0"
              style="width: 10%"
            ></div>
          </div>
          <span>900</span>
        </div>
      </div>
    </div>

    <!-- Review List -->
    <div class="mt-8 space-y-6">
      <!-- Single Review -->
      <div class="border rounded p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="font-semibold">Alexander Rity</div>
            <span class="text-gray-400 text-sm">4 months ago</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-semibold">5.0</span>
            <div class="flex items-center gap-0.5">
              <IconsIconStar v-for="item in 5" class="size-4" />
            </div>
          </div>
        </div>
        <p class="text-gray-700 mt-2">
          Easy booking, great value! Cozy rooms at a reasonable price in
          Sheffield's vibrant center. Surprisingly quiet with nearby Traveller’s
          accommodations. Highly recommended!
        </p>
        <div class="flex gap-2 mt-3">
          <img
            class="h-16 w-16 object-cover rounded"
            src="https://source.unsplash.com/random/80x80?room1"
          />
          <img
            class="h-16 w-16 object-cover rounded"
            src="https://source.unsplash.com/random/80x80?room2"
          />
          <img
            class="h-16 w-16 object-cover rounded"
            src="https://source.unsplash.com/random/80x80?room3"
          />
        </div>
      </div>

      <!-- Another Review -->
      <div class="border rounded p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="font-semibold">Emma Creight</div>
            <span class="text-gray-400 text-sm">4 months ago</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-semibold">4.0</span>
            <div class="flex items-center gap-0.5">
              <IconsIconStar v-for="item in 5" class="size-4" />
            </div>
          </div>
        </div>
        <p class="text-gray-700 mt-2">
          Effortless booking, unbeatable affordability! Small yet comfortable
          rooms in the heart of Sheffield’s nightlife hub. Surrounded by elegant
          housing, it’s a peaceful gem. Thumbs up!
        </p>
      </div>
    </div>

    <!-- Leave a Review Form -->
    <div class="mt-10">
      <h3 class="text-xl font-bold mb-4">Leave a Review</h3>
      <form class="space-y-6 p-4 bg-white rounded shadow max-w-2xl">
        <div class="form__group">
          <label class="block text-lg font-semibold mb-2">Overall Rating</label>
          <div class="flex space-x-4">
            <label
              v-for="n in 5"
              :key="'overall-' + n"
              class="inline-flex items-center space-x-1"
            >
              <input
                type="radio"
                :value="n"
                v-model="form.rating"
                class="accent-primary"
              />
              <span>{{ n }}</span>
            </label>
          </div>
        </div>

        <div class="form__group">
          <label class="form__label">Comment</label>
          <textarea class="form__control" rows="4"></textarea>
        </div>

        <BaseButton>Submit Review</BaseButton>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
