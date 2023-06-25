
<template>
    <div class="row">
        <div class="col-3 d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style="width: 280px;">
            <NavbarAdmin :active="active"></NavbarAdmin>
        </div>
        <div class="col-9">
            <div class="card">
                <div class="container">
                    <h2>Our category</h2>
                    <router-link :to="{ name: 'AddCategory' }">
                        <button class=" btn btn-primary">Add category</button>
                    </router-link>
                    <div class="row">
                        <div v-for="category of categories" :key="category.id" class="col-6 col-md-4">
                            <CategoryBox :category="category"></CategoryBox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable vue/multi-word-component-names */
const axios = require("axios");
import CategoryBox from "@/components/Category/CategoryBox.vue"
import { apiUrl } from "@/config/config";
import NavbarAdmin from "../../../components/Navbar/NavbarAdmin.vue"
export default {
    name: 'CategoryAdmin',
    components: { CategoryBox, NavbarAdmin },
    data() {
        return {
            categories: [],
            active: 1,
        };
    },

    methods: {
        async getCategory() {
            await axios.get(`${apiUrl}category/`)
                .then(res => this.categories = res.data)
                .catch(erro => console.log(erro))
        }
    },

    mounted() {
        this.getCategory();
    }
}
</script>

<style scoped></style>