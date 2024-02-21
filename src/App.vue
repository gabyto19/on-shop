<template>
  <header>
    <v-toolbar title="Application">
      <v-btn
        @click="router.push({ name: 'CartView' })"
        color="primary"
        variant="elevated"
      >
        Items in Cart: {{ totalItemsInCart }}
      </v-btn>
    </v-toolbar>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { useRouter } from "vue-router";
import { productsStore } from "@/stores/products";
import { computed } from "vue";

const router = useRouter();
const store = productsStore();

// Compute the total number of items in the cart
const totalItemsInCart = computed(() => {
  return store.cart.reduce((total, item) => total + item.quantity, 0);
});
</script>

<style scoped>
.cart-items {
  text-align: end;
  padding: 16px;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
}
</style>
