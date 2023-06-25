<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-left">
        <h2 class="pt-3">Sản phẩm được bán chạy</h2>
      </div>
    </div>
    <div class="row">
      <div
        v-for="product of products"
        :key="product.id"
        class="col-6 col-md-4 col-xl-3"
      >
        <ProductBox :product="product"></ProductBox>
      </div>
    </div>
  </div>
</template>

<script>
import ProductBox from "@/components/Product/ProductBox.vue";
import { apiUrl } from "@/config/config";
const axios = require("axios");

export default {
  name: "ListProducts",
  data() {
    return {
      products: null,
      id: null,
    };
  },
  components: { ProductBox },
  methods: {
    async getProducts() {
      await axios
        .get(`${apiUrl}product/${this.id}?page=0&size=10`)
        .then((res) => (this.products = res.data.content))
        .catch((erro) => console.log(erro));
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getProducts();
  },
};
</script>
