<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-left">
        <h2
          class="pt-3"
          style="font-weight: bold; margin-bottom: 50px; margin-top: 50px"
        >
          Các loại sản phẩm
        </h2>
      </div>
    </div>
    <div class="row">
      <div
        v-for="category of categories"
        :key="category.id"
        class="col-6 col-md-4 col-lg-3 mb-4"
      >
        <CategoryBox :category="category"></CategoryBox>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import CategoryBox from "@/components/Category/CategoryBox.vue";
export default {
  name: "Category",
  props: ["baseURL", "categories"],
  components: {
    CategoryBox,
  },
  data() {
    return {
      category_size: 0,
      product_size: 0,
    };
  },
  mounted() {
    this.category_size = this.categories.length;
    this.category_size = Math.min(6, this.category_size);

    // this.product_size = this.products.length;
    // this.product_size = Math.min(8, this.product_size);
  },
};
</script>
