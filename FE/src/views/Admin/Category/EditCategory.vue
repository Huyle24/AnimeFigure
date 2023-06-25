<template>
    <div class="row">
        <div class="col-3 d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style="width: 280px;">
            <NavbarAdmin :active="active"></NavbarAdmin>
        </div>
        <div class="col-9">
            <div class="container">
                <div class="row">
                    <div class="text-center">
                        <h2>Edit category</h2>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <form>
                                <div class="col-12 mb-3">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon1">Name category</span>
                                        <input type="text" class="form-control" aria-label="namecategory"
                                            v-model="category.categoryName" aria-describedby="basic-addon1">
                                    </div>
                                </div>
                                <div class="col-12 mb-3">
                                    <div class="input-group">
                                        <span class="input-group-text">Description</span>
                                        <textarea class="form-control" aria-label="With textarea"
                                            v-model="category.description"></textarea>
                                    </div>
                                </div>
                                <div class="col-12 mb-3">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="image">Image</span>
                                        <input type="text" class="form-control" placeholder="https://image.prettyshop.com/"
                                            aria-label="imageUrl" aria-describedby="basic-addon1"
                                            v-model="category.imageUrl">
                                    </div>
                                </div>
                                <button type="button" class="btn btn-primary" @click="editCategory">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const axios = require("axios");
const sweetalert = require("sweetalert");
import { apiUrl } from "@/config/config";
import NavbarAdmin from "../../../components/Navbar/NavbarAdmin.vue"

export default {
    components: { NavbarAdmin }
    , data() {
        return {
            category: null,
            id: null,
            active: 1,
        }
    },
    methods: {
        async getCategory() {
            await axios.get(`${apiUrl}category/${this.id}`)
                .then(res => this.category = res.data)
                .catch(erro => console.log(erro))
        },
        async editCategory() {
            console.log(this.category);
            await axios.put(`${apiUrl}category/update/` + this.id, this.category)
                // eslint-disable-next-line    
                .then(res => {
                    //sending the event to parent to handle
                    this.$emit("fetchData");
                    this.$router.push({ name: 'CategoryAdmin' });
                    sweetalert({
                        text: "Category Updated Successfully!",
                        icon: "success",
                        closeOnClickOutside: false,
                    });
                })
                .catch(err => console.log(err));
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.getCategory();
    },
}
</script>

<style scoped></style>