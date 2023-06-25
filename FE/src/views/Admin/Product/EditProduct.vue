<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-3 d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary">
                <NavbarAdmin :active="active"></NavbarAdmin>
            </div>
            <div class="col-9">
                <div class="container">
                    <div class="row">
                        <div class="col-12 text-center">
                            <h4 class="pt-3">Edit Product</h4>
                        </div>
                        <div class="col-6">
                            <div class="container">
                                <div class="row">
                                    <div class="col-12">
                                        <form v-if="product">
                                            <div class="form-group">
                                                <label>Category</label>
                                                <select class="form-control" v-model="product.categoryId" required>
                                                    <option v-for="category of categories" :key="category.id"
                                                        :value="category.id">
                                                        {{ category.categoryName }}</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>Name</label>
                                                <input type="text" class="form-control" v-model="product.name" required>
                                            </div>
                                            <div class="form-group">
                                                <label>Description</label>
                                                <input type="text" class="form-control" v-model="product.description"
                                                    required>
                                            </div>
                                            <div class="form-group">
                                                <label>ImageURL</label>
                                                <input type="url" class="form-control" v-model="product.imageURL" required>
                                            </div>
                                            <div class="form-group">
                                                <label>Price</label>
                                                <input type="number" class="form-control" v-model="product.price" required>
                                            </div>
                                            <button type="button" class="btn btn-primary"
                                                @click="editProduct">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="container">
                                <div class="row">
                                    <div class="col-12">
                                        <h2>Edit size</h2>
                                    </div>
                                    <div class="col-12">
                                        <select v-if="product.size" class="form-select" aria-label="Default select example"
                                            v-model="selected">
                                            <option selected>Open this select menu</option>
                                            <option v-for="(item, index) in product.size" :value="index" :key="index">
                                                {{ item }}</option>

                                        </select>


                                        <form class="input-group input-group-sm mb-3 px-2 py-1  mt-2 ms-5 text-light w-50"
                                            @submit="editQuality" v-if="selected >= 0">
                                            <span class="input-group-text" id="inputGroup-sizing-sm">{{
                                                product.size[selected] }}</span>
                                            <input type="text" class="form-control" aria-label="Sizing example input"
                                                aria-describedby="inputGroup-sizing-sm"
                                                v-model="product.quantityBySizes[selected]">
                                            <button type="submit" class="btn btn-warning w-50  col-4 mt-3  float-end  "
                                                v-if="selected >= 0">Edit Quality</button>
                                        </form>
                                        <button type="submit" class="btn btn-danger w-50  col-4 mt-3  float-end  "
                                            v-if="selected >= 0" @click="deleteSize">Delete Quality</button>
                                    </div>

                                    <div class="col-12 my-5"></div>
                                    <form class="input-group input-group-sm mb-3 py-1  mt-2 col-12"
                                        @submit="addSizeQuality" v-if="addsizeState == true">
                                        <div class="container">
                                            <div class="input-group input-group-sm mb-3" v-if="addsizeState == true">
                                                <span class="input-group-text" id="inputGroup-sizing-sm">Add size</span>
                                                <input type="text" class="form-control" aria-label="Sizing example input"
                                                    v-model="addSize" aria-describedby="inputGroup-sizing-sm">
                                            </div>
                                            <div class="input-group input-group-sm mb-3" v-if="addsizeState == true">
                                                <span class="input-group-text" id="inputGroup-sizing-sm">Qualityfy
                                                    size</span>
                                                <input type="text" class="form-control" aria-label="Sizing example input"
                                                    v-model="addSizeQualityfy" aria-describedby="inputGroup-sizing-sm">
                                            </div>
                                            <button class="btn btn-primary col-4 ms-2" type="submit" v-if="addsizeState">Submit
                                                size</button>
                                        </div>
                                    </form>
                                    <button class="btn btn-success col-4" v-if="!addsizeState" @click="addSizeState">Add
                                        size</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { apiUrl } from "@/config/config";
const axios = require("axios");
import NavbarAdmin from "../../../components/Navbar/NavbarAdmin.vue"
import swal from 'sweetalert';
export default {
    name: "EditProduct",
    props: ["categories"],
    components: { NavbarAdmin },
    data() {
        return {
            product: {},
            baseURL: apiUrl,
            active: 2,
            selected: -1,
            addsizeState: false,
            addSize: "",
            addSizeQualityfy: 0
        }
    },
    methods: {
        async editProduct() {
            axios.post(this.baseURL + "product/update/" + this.id, this.product)
                .then(res => {
                    //sending the event to parent to handle
                    console.log(res);
                    this.$emit("fetchData");
                    this.$router.push({ name: 'ProductAdmin' });
                    swal({
                        text: "Product Updated Successfully!",
                        icon: "success",
                        closeOnClickOutside: false,
                    });
                })
                .catch(err => console.log("err", err));
        },
        addSizeState() {
            this.addsizeState = true;
        },
        async deleteSize(e) {
            e.preventDefault();
            axios.post(`${apiUrl}product/${this.product.id}/deleteQuantityBySize?size=${this.product.size[this.selected]}`)
                .then(res => {
                    //sending the event to parent to handle
                    console.log(res);
                    this.$emit("fetchData");
                    this.getProduct();
                    // this.$router.push({ name: 'ProductAdmin' });
                    swal({
                        text: "Product DELETE Successfully!",
                        icon: "success",
                        closeOnClickOutside: false,
                    });
                })
                .catch(err => console.log("err", err));
        },
        async addSizeQuality(e) {
            e.preventDefault();
            axios.post(`${apiUrl}product/${this.product.id}/addQuantityBySize`, {
                size: this.addSize,
                quantity: this.addSizeQualityfy
            })
                .then(res => {
                    //sending the event to parent to handle
                    console.log(res);
                    this.$emit("fetchData");
                    this.getProduct();
                    // this.$router.push({ name: 'ProductAdmin' });
                    swal({
                        text: "Product ADD Successfully!",
                        icon: "success",
                        closeOnClickOutside: false,
                    });
                    this.addsizeState = false;
                })
                .catch(err => console.log("err", err));
        },
        async editQuality(e) {
            e.preventDefault();


            axios.post(`${apiUrl}product/${this.product.id}/updateQuantityBySize`, {
                size: this.product.size[this.selected],
                quantity: this.product.quantityBySizes[this.selected]
            })
                .then(res => {
                    //sending the event to parent to handle
                    console.log(res);
                    this.$emit("fetchData");
                    this.getProduct();
                    // this.$router.push({ name: 'ProductAdmin' });
                    swal({
                        text: "Product Updated Successfully!",
                        icon: "success",
                        closeOnClickOutside: false,
                    });
                })
                .catch(err => console.log("err", err));
        },
        async getProduct() {
            await axios.get(`${apiUrl}product/getproduct/${this.id}`)
                .then(res => {
                    this.product = res.data;
                    console.log(this.product.size);
                    this.category = this.categories.find(
                        (category) => category.id == this.product.categoryId
                    );
                })
                .catch(erro => console.log(erro))
        },
    },
    mounted() {
        if (!localStorage.getItem('token')) {
            this.$router.push({ name: 'Signin' });
            return;
        }
        this.id = this.$route.params.id;
        this.product = this.getProduct();
    }
}
</script>