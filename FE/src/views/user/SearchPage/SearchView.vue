<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-left">
                <h2 class="pt-3">Tìm kiếm</h2>
            </div>
        </div>
        <div class="row">
            <h2>Category</h2>
                <div v-for="category of categories" :key="category.id" class="col-6 col-md-4">
                    <CategoryBox :category="category"></CategoryBox>
                </div>
            </div>
        <div class="row">
            <h2>Product</h2>

            <div v-for="product of products" :key="product.id" class="col-6 col-md-4 col-xl-3">
                <ProductBox :product="product"></ProductBox>
            </div>
        </div>
    </div>
</template>

<script>
import ProductBox from "@/components/Product/ProductBox.vue"
import { apiUrl } from "@/config/config";
const axios = require("axios");
import CategoryBox from "@/components/Category/CategoryBox.vue"

export default {
    name: 'SearchView',
    data() {
        return {
            products: null,
            string: null,
            categories: []
        }
    },
    components: { ProductBox, CategoryBox },
    methods: {
        async getProducts() {
            await axios.get(`${apiUrl}product/search?keyword=${this.string}&page=0&size=10`)
                .then(res => this.products = res.data.content)
                .catch(erro => console.log(erro))
        },
        async getCategory() {
            await axios.get(`${apiUrl}category/search?categoryName=${this.string}&page=0&size=10`)
                .then(res => this.categories = res.data.content)
                .catch(erro => console.log(erro))
        }
       
    },
    created() {
        this.string = this.$route.params.string;
        this.getProducts();
        this.getCategory();
    },
}

</script>