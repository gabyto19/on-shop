<template>
  <button @click="router.push({ name: 'Catalog' })" class="btn btn-primary">
    Back to catalog
  </button>
  <button @click="buyCartItems" class="btn btn-success">Buy now</button>


  <br /><br />

  <div v-if="!store.cart.length" style="text-align: center">
    <h1>Empty Cart ...</h1>
  </div>
  <div class="cart-items" v-else>
    <div class="cart-item" v-for="item in store.cart" :key="item.id">
      <div class="item-details">
        <img :src="item.thumbnail" alt="" />
        <span>Brand: {{ item.brand }}</span>
        <span>Category: {{ item.category }}</span>
        <span>Price: ${{ item.price }}</span>
        <span>Quantity: {{ item.quantity }}</span>
        <button @click="removeFromCart(item.id)" class="btn btn-danger">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "CartView",
});
</script>

<script setup>
import { computed } from "vue";
import { productsStore } from "@/stores/products";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = productsStore();

const removeFromCart = (id) => {
  store.removeFromCart(id);
};
const buyCartItems = () => {
  const cartItemsQuery = encodeURIComponent(JSON.stringify(store.cart));
  router.push({ name: 'BuyView', query: { products: cartItemsQuery } });
};



</script>

<style scoped>
.item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  box-shadow: 0 0 17px 6px #e7e7e7;
  border-radius: 8px;
  padding: 16px;
}

.item-details img {
  width: 20%;
}
</style>
