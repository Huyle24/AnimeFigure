
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-3 d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary">
                <NavbarAdmin :active="active"></NavbarAdmin>
            </div>
            <div class="col-9">
                <div class="card">
                    <div class="row">
                        <div class="col-12 text-center">
                            <h4 class="pt-3">Manager Product</h4>
                        </div>
                    </div>
                    <div class="container">
                        <router-link id="add-product" :to="{ name: 'AddProduct' }" v-show="$route.name == 'ProductAdmin'">
                            <button class="btn btn-warning">Add a new Product</button>
                        </router-link>
                        <div class="row">
                            <div class="col-12 text-left">
                                <h2 class="pt-3">Our Product</h2>
                            </div>
                            <div v-for="product of products" :key="product.id" class="col-6 col-md-4 col-xl-3">
                                <ProductBox :product="product" @productDeleted="refreshProducts"></ProductBox>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end mt-2">
                    <nav aria-label="Page navigation">
                        <ul class="pagination">
                            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
                            </li>
                            <li v-for="page in pages" :key="page" class="page-item"
                                :class="{ active: currentPage === page }">
                                <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                            </li>
                            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import ProductBox from "@/components/Product/ProductBox.vue"
import { apiUrl } from "@/config/config";
const axios = require("axios");
import NavbarAdmin from "../../../components/Navbar/NavbarAdmin.vue"
export default {
    name: 'ProductAdmin',
    components: { ProductBox, NavbarAdmin },
    data() {
        return {
            products: null,
            active: 2,
            baseURL: apiUrl,
            currentPage: 1, // trang hiện tại
            pageSize: 10, // số sản phẩm trên mỗi trang
            totalProducts: 0, // tổng số sản phẩm
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalProducts / this.pageSize);
        },
        pages() {
            const range = (start, end) =>
                Array.from({ length: end - start }, (_, i) => start + i);
            if (this.totalPages <= 7) {
                return range(1, this.totalPages + 1);
            }
            let startPage = Math.max(1, this.currentPage - 3);
            let endPage = Math.min(this.totalPages + 1, this.currentPage + 4);
            if (startPage === 1) {
                return range(1, endPage);
            } else if (endPage === this.totalPages + 1) {
                return range(startPage - 3, endPage);
            } else {
                return range(startPage, endPage);
            }
        },
    },
    methods: {
        refreshProducts() { // phương thức refreshProducts để làm mới danh sách sản phẩm
            this.$forceUpdate();
        },
        async fetchData() {
            await axios
                .get(this.baseURL + `product/?page=${this.currentPage}&size=${this.pageSize}`)
                .then((res) => {
                    this.products = res.data.content;
                    this.totalProducts = res.data.totalElements;
                })
                .catch((err) => console.log(err));
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                this.fetchData();
            }
        },
    },

    mounted() {
        this.fetchData();
    }
}
</script>

<style scoped></style>