<script setup>
const props = defineProps({
  title: String,
  description: String,
  keywords: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "https://www.buyzin.com/images/buyzin-logo-social.png",
  },
  url: {
    type: String,
    default: () => useRequestURL().href,
  },
});
</script>

<template>
  <Head>
    <Title>{{ props.title }}</Title>

    <!-- Basic Meta -->
    <Meta name="description" :content="props.description" />
    <Meta name="keywords" :content="props.keywords" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" :href="props.url" />

    <!-- Open Graph / Facebook -->
    <Meta property="og:locale" content="en_US" />
    <Meta property="og:type" content="website" />
    <Meta property="og:title" :content="props.title" />
    <Meta property="og:description" :content="props.description" />
    <Meta property="og:url" :content="props.url" />
    <Meta property="og:site_name" content="Buyzin" />
    <Meta property="og:image" :content="props.image" />
    <Meta property="og:image:width" content="1200" />
    <Meta property="og:image:height" content="630" />

    <!-- Twitter -->
    <Meta name="twitter:card" content="summary_large_image" />
    <Meta name="twitter:site" content="@buyzin" />
    <Meta name="twitter:creator" content="@buyzin" />
    <Meta name="twitter:title" :content="props.title" />
    <Meta name="twitter:description" :content="props.description" />
    <Meta name="twitter:image" :content="props.image" />

    <Link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
    <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  </Head>
</template>

<style scoped></style>
