<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-3 d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style="width: 280px;">
                <NavbarAdmin :active="active"></NavbarAdmin>
            </div>
            <div class="col-9">
                <div class="card">
                    <h2>Manager order</h2>
                    <!--        for each order display -->
                    <div class="container">
                        <div v-for="order in orderList" :key="order.pid" class="row mt-2 pt-3 justify-content-around">
                            <div class="col-2"></div>
                            <div class="col-md-3 embed-responsive embed-responsive-16by9">
                                <!--                display image in left-->
                                <img v-bind:src="order.imageURL" class="w-100 card-img-top embed-responsive-item">
                            </div>
                            <div class="col-md-5 px-3">
                                <div class="card-block px-3">
                                    <h6 class="card-title">
                                        <router-link v-bind:to="'order/' + order.id">Order No : {{ order.id
                                        }}</router-link>
                                    </h6>
                                    <p class="mb-0">{{ order.totalItems }} item<span v-if="order.totalItems > 1">s</span>
                                    </p>
                                    <p id="item-price" class="mb-0 font-weight-bold">Total Cost : $ {{ order.totalCost
                                    }}</p>
                                    <p id="item-total-price">Ordered on : {{ order.orderdate }}</p>
                                    <p id="item-total-price">Status : {{ order.status }}</p>
                                </div>
                            </div>
                            <div class="col-2"></div>
                            <div class="col-12">
                                <hr>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end mt-2">
                        <nav aria-label="Page navigation">
                            <ul class="pagination">
                                <li class="page-item" :class="{ disabled: currentPage === 0 }">
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
    </div>
</template>
<script>
import { apiUrl } from "@/config/config";
import NavbarAdmin from "../../../components/Navbar/NavbarAdmin.vue"
const axios = require('axios')

export default {
    name: 'OrderAdmin',
    components: { NavbarAdmin },
    data() {
        return {
            token: null,
            orderList: [],
            baseURL: apiUrl,
            active: 3,
            currentPage: 0, // trang hiện tại
            pageSize: 10, // số sản phẩm trên mỗi trang
            totalProducts: 0, // tổng số sản phẩm
        }
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
        listOrders() {
            axios.get(`${this.baseURL}order/getallorder?token=${this.token}&page=${this.currentPage}&size=${this.pageSize}&sort=createdAt&sort=desc`)
                .then((response) => {
                    if (response.status == 200) {
                        this.orders = response.data
                        // for each order populate orderList
                        this.orders.forEach((order) => {
                            this.orderList.push({
                                id: order.id,
                                totalCost: order.totalPrice,
                                // get short date
                                orderdate: order.createdDate,
                                // get image of the first orderItem of the order
                                imageURL: order.orderItems[0].product.imageURL,
                                // get total items
                                totalItems: order.orderItems.length,
                                status: order.status ? JSON.parse(order.status).status : ""
                            })
                        })
                    }
                },
                    (error) => {
                        console.log(error)
                    });
        },
    },

    mounted() {
        this.token = localStorage.getItem("token");
        this.listOrders();
    },
}
</script>

<style scoped></style>