import { defineStore } from "pinia";

export const productsStore = defineStore("products", {
  state: () => ({
    products: [],
    cart: [],
    bought: null,
  }),

  actions: {
    fetchProductsFromDB() {
      fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((json) => {
          this.products = json.products;
        });
    },

    addToCart(product) {
      const existingCartItem = this.cart.find((item) => item.id === product.id);

      if (existingCartItem) {
        // If the product is already in the cart, increment its quantity
        existingCartItem.quantity++;
      } else {
        // If the product is not in the cart, add it with a quantity of 1
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    addToBuy(product) {
      this.bought = product; // Assign the product directly
    },
    buyProducts(products) {
      // Assuming you'll change `bought` to an array to hold multiple products
      this.bought = products;
    },

    removeFromCart(id) {
      const existingCartItem = this.cart.find((item) => item.id === id);

      if (existingCartItem) {
        // Decrement the quantity of the item
        if (existingCartItem.quantity > 1) {
          existingCartItem.quantity--;
        } else {
          // If the quantity is 1, remove the item from the cart
          const index = this.cart.findIndex((item) => item.id === id);
          this.cart.splice(index, 1);
        }
      }
    },
  },
});
