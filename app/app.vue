<script setup>
useSchemaOrg([
  defineOrganization({
    "@type": ["Organization", "Store", "OnlineStore"],

    // Basic Information
    name: "Buyzin",
    alternateName: "Shop Smart. Live Easy.",
    description:
      "Buyzin is Bangladesh’s trusted online shopping platform. We are committed to providing 100% genuine and authentic products at the best prices. Shop smart, live easy with fast delivery, secure payments, and top-notch customer service.",
    url: "https://buyzin.com",
    logo: "/logo.png",

    // Contact Information
    email: "support@buyzin.com",
    telephone: "+880-1516-598533",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+880-1516-598533",
        email: "support@buyzin.com",
        availableLanguage: ["English", "Bengali"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Saturday",
          ],
          opens: "09:00:00",
          closes: "20:00:00",
        },
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+880-1315-598151",
        email: "sales@buyzin.com",
      },
    ],

    // Business Details
    foundingDate: "2025-11-09",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 20,
    },

    // Legal / Brand Info
    legalName: "Buyzin Limited",
    taxID: "BD-123456789",
    vatID: "BD-VAT-987654321",

    // Business Address
    address: {
      "@type": "PostalAddress",
      streetAddress: "House 12, Road 5, Tapur Char",
      addressLocality: "Rowmari",
      addressRegion: "Rangpur Division",
      postalCode: "5640",
      addressCountry: "BD",
    },

    // Return Policy
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      name: "Buyzin Return Policy",
      inStoreReturnsOffered: false,
      merchantReturnDays: "7",
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      returnMethod: ["ReturnByMail"],
      returnFees: "https://schema.org/FreeReturn",
      returnPolicyCountry: {
        "@type": "Country",
        name: ["Bangladesh"],
      },
    },

    // Shipping Policy
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "0",
        currency: "BDT",
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: ["Bangladesh"],
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 2,
          unitCode: "DAY",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: 2,
          maxValue: 5,
          unitCode: "DAY",
        },
      },
    },

    // Payment Methods
    paymentAccepted: [
      "Credit Card",
      "bKash",
      "Nagad",
      "Rocket",
      "Cash on Delivery",
    ],
    currenciesAccepted: ["BDT"],

    // Social Links
    sameAs: [
      "https://www.facebook.com/BuyzinLimited",
      "https://www.youtube.com/@BuyzinLimited",
      "https://x.com/BuyzinLimited",
    ],

    // Rating
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "15460",
      bestRating: "5",
      worstRating: "1",
    },

    // Product Catalog
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Buyzin Product Catalog",
      url: "https://buyzin.com/products",
    },

    // Keywords & SEO
    slogan: "Shop Smart. Live Easy.",
    keywords: [
      // General eCommerce & Trust
      "online shopping Bangladesh",
      "buy products online BD",
      "genuine products Bangladesh",
      "best online shop in Bangladesh",
      "trusted eCommerce site BD",
      "original products BD",
      "Buyzin online shop",

      // Electronics & Gadgets
      "mobile phone price in Bangladesh",
      "smartphone deals BD",
      "laptop price in BD",
      "computer accessories Bangladesh",
      "smartwatch Bangladesh",
      "Bluetooth speaker BD",
      "gaming accessories BD",
      "electronics online store BD",

      // Home & Living
      "home appliances Bangladesh",
      "kitchen appliances BD",
      "refrigerator price in Bangladesh",
      "washing machine Bangladesh",
      "microwave oven BD",
      "home decor items BD",
      "modern furniture Bangladesh",

      // Fashion & Lifestyle
      "men fashion Bangladesh",
      "women fashion BD",
      "shoes online BD",
      "watches for men Bangladesh",
      "bags and accessories BD",
      "cosmetics online shop Bangladesh",
      "perfume price in BD",

      // Offers & Promotions
      "discount offers BD",
      "flash sale Bangladesh",
      "online deals BD",
      "buy 1 get 1 Bangladesh",
      "cash on delivery BD",
      "free shipping Bangladesh",

      // Payment & Service
      "secure online payment BD",
      "fast delivery Bangladesh",
      "return policy Bangladesh",
      "customer service BD",
      "buy now pay later Bangladesh",

      // Brand & Trust
      "Buyzin official site",
      "Shop Smart Live Easy",
      "buyzin.com Bangladesh",
      "best eCommerce website BD",
      "authentic product store BD",
    ],

    // Business Hours
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Saturday",
        ],
        opens: "09:00:00",
        closes: "20:00:00",
      },
    ],
  }),
]);
</script>

<template>
  <NuxtLayout>
    <UApp>
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
