<template>
  <div>
    <button @click="goToCatalog" class="btn btn-primary">
      Back to Catalog
    </button>

    <div v-if="Array.isArray(products) && products.length">
      <!-- Displaying multiple products -->
      <div class="product" v-for="product in products" :key="product.id">
        <img :src="product.thumbnail" alt="" />
        <h1>{{ product.name }}</h1>
        <p>Brand: {{ product.brand }}</p>
        <p>{{ product.description }}</p>
        <p>Price: ${{ product.price }}</p>
        <p>Quantity: {{ product.quantity }}</p>
        <!-- Display quantity -->
      </div>
      <h2>Total Products: {{ totalQuantity }}</h2>
    </div>
    <div v-else>
      <!-- Displaying a single product -->
      <div class="product">
        <img :src="products.thumbnail" alt="" />
        <h1>{{ products.name }}</h1>
        <p>Brand: {{ products.brand }}</p>
        <p>{{ products.description }}</p>
        <p>Price: ${{ products.price }}</p>
        <p v-if="products.quantity">Quantity: {{ products.quantity }}</p>
        <!-- Display quantity if available -->
      </div>
    </div>
  </div>

  <button class="btn btn-success" @click="toggler = true">Buy now</button>
  <p v-if="toggler" class="text-success">payment has been successfully processed</p>

</template>

<script>
export default {
  data() {
    return {
      toggler: false,
    };
  },
};
</script>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const products = computed(() => {
  if (route.query.products) {
    return JSON.parse(decodeURIComponent(route.query.products));
  } else if (route.query.product) {
    return [JSON.parse(decodeURIComponent(route.query.product))];
  }
  return [];
});

const totalQuantity = computed(() => {
  return products.value.reduce(
    (total, product) => total + (product.quantity || 1),
    0
  );
});
function goToCatalog() {
  router.push({ name: 'Catalog' });
}
</script>

<style scoped>
.product {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
</style>
