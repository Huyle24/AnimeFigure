<template>
    <div class="row">
        <div class="col-3 d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style="width: 280px;">
            <NavbarAdmin :active="active"></NavbarAdmin>
        </div>
        <div class="col-9">
            <div class="card">
                <div class="container">
                    <div class="row">
                        <div class="col-12 text-center">
                            <h4 class="pt-3">Order Id: {{ orderID }}</h4>
                        </div>
                    </div>

                    <div v-for="(orderItem, index) in orderItems" :key="index" class="row mt-2 pt-3 justify-content-around">
                        <div class="col-1"></div>
                        <div class="col-md-3 embed-responsive embed-responsive-16by9">
                            <img :src="orderItem.product.imageURL" class="w-100 card-img-top embed-responsive-item">
                            <hr />
                        </div>

                        <div class="col-md-5 px-3">
                            <div class="card-block px-3">
                                <h6 class="card-title">{{ orderItem.product.name }}</h6>
                                <p id="item-price" class="mb-0 font-weight-bold">${{ orderItem.product.price }} per unit</p>
                                <p id="item-quantity" class="mb-0">Quantity : {{ orderItem.quantity }}</p>
                                <p id="item-total-price" class="mb-0">
                                    Total Price : $<span class="font-weight-bold">{{ orderItem.price * orderItem.quantity
                                    }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="col-1"></div>
                    </div>

                    <div class="total-cost pt-2 text-right">
                        <h5>Total Cost : $ {{ order.totalPrice }}</h5>
                    </div>
                    <h5>Status: {{this.status?  JSON.parse(this.status).status : "" }}</h5>
                    <select class="form-select" aria-label="Default select example" v-model="selectedStatus">
                        <option :selected="!this.status">Open this select menu</option>
                        <option value="Pending" :selected="this.status === 'Pending'">Pending</option>
                        <option value="Transport" :selected="this.status === 'Transport'">Transport</option>
                        <option value="Delivered" :selected="this.status === 'Delivered'">Delivered</option>
                    </select>


                    <button @click="updateOrderStatus">Update status</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios')
import NavbarAdmin from "../../../components/Navbar/NavbarAdmin.vue"
export default {
    name: 'OrderAdminDetail',
    props: ["baseURL"],
    components: { NavbarAdmin },
    data() {
        return {
            orderItems: [],
            order: {},
            token: null,
            orderID: 0,
            status: ""
        }
    },

    methods: {
        async getOrder() {

            await axios.get(`${this.baseURL}order/${this.orderID}?token=${this.token}`).then((response) => {
                if (response.status === 200) {
                    this.order = response.data;
                    this.orderItems = this.order.orderItems;
                    this.status = this.order ?  JSON.parse(this.orderItems.status).status : ""
                   
                }
            },
                (err) => {
                    console.log(err)
                })
        },
        async updateOrderStatus() {
            // create a plain object from FormData
            const payload = {
                status: this.selectedStatus
            };
            await axios.put(`${this.baseURL}order/${this.orderID}/status?token=${this.token}`, payload)
                .then((response) => {
                    if (response.status === 200) {
                        this.$router.push({ name: "OrderAdmin" });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },

    },

    mounted() {
        this.orderID = this.$route.params.id;
        this.token = localStorage.getItem("token")
        this.getOrder()
    }
}

</script>

<style scoped>
h4 {
    font-family: 'Roboto', sans-serif;
    color: #484848;
    font-weight: 700;
}

.embed-responsive .card-img-top {
    object-fit: cover;
}
</style>
