<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-3 d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary">
                <NavbarAdmin :active="active"></NavbarAdmin>
            </div>
            <div class="col-9">
                <div class="container">
                    

                    <div class="row">
                        <div class="col-3"></div>
                        <div class="col-md-6 px-5 px-md-0">
                            <form>
                                <div class="form-group">
                                    <label>Category</label>
                                    <select class="form-control" v-model="categoryId" required>
                                        <option v-for="category of categories" :key="category.id" :value="category.id">
                                            {{ category.categoryName }}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" class="form-control" v-model="name" required>
                                </div>
                                <div class="form-group">
                                    <label>Description</label>
                                    <input type="text" class="form-control" v-model="description" required>
                                </div>
                                <div class="form-group">
                                    <label>ImageURL</label>
                                    <input type="url" class="form-control" v-model="imageURL" required>
                                </div>
                                <div class="form-group">
                                    <label>Price</label>
                                    <input type="number" class="form-control" v-model="price" required>
                                </div>
                                <button type="button" class="btn btn-primary" @click="addProduct">Submit</button>
                            </form>
                        </div>
                        <div class="col-3"></div>
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
    name: "AddProduct",
    props: ["categories"],
    components: { NavbarAdmin },
    data() {
        return {
            product: null,
            baseURL: apiUrl,
            active: 2,
        }
    },
    methods: {
        async addProduct() {
            const newProduct = {
                id: this.id,
                categoryId: this.categoryId,
                name: this.name,
                description: this.description,
                imageURL: this.imageURL,
                price: this.price
            }

            await axios({
                method: 'post',
                url: this.baseURL + "product/add",
                data: JSON.stringify(newProduct),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    //sending the event to parent to handle
                    this.$emit("fetchData");
                    console.log(res);
                    this.$router.push({ name: 'ProductAdmin' });
                    swal({
                        text: "Product Added Successfully!",
                        icon: "success",
                        closeOnClickOutside: false,
                    });
                })
                .catch(err => console.log(err));
        }
    },
    mounted() {
        if (!localStorage.getItem('token')) {
            this.$router.push({ name: 'Signin' });
        }
    }
}
</script>