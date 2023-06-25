<template>
    <div class="container">
        <div class="row">
            <div class="text-center">
                <h2>Add category</h2>
            </div>
            <div class="row">
                <div class="col-12">
                    <form>
                        <div class="col-12 mb-3">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Name category</span>
                                <input type="text" class="form-control" aria-label="namecategory" v-model="categoryName"
                                    aria-describedby="basic-addon1">
                            </div>
                        </div>
                        <div class="col-12 mb-3">
                            <div class="input-group">
                                <span class="input-group-text">Description</span>
                                <textarea class="form-control" aria-label="With textarea" v-model="description"></textarea>
                            </div>
                        </div>
                        <div class="col-12 mb-3">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="image">Image</span>
                                <input type="text" class="form-control" placeholder="https://image.prettyshop.com/"
                                    aria-label="imageUrl" aria-describedby="basic-addon1" v-model="imageUrl">
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary" @click="addCategory">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require("axios");
const sweetalert = require("sweetalert");
import { apiUrl } from "@/config/config";
export default {
    data() {
        return {
            categoryName: "",
            description: "",
            imageUrl: ""
        }
    },
    methods: {
        
        addCategory() {
            const newCategory = {
                categoryName: this.categoryName,
                description: this.description,
                imageUrl: this.imageUrl
            };
            axios({
                method :'post',
                url: `${apiUrl}category/create`,
                data: JSON.stringify(newCategory),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(()=>{
                sweetalert({
                    text: 'Category add successfully',
                    icon: 'success'
                })
            }).catch((err)=>{
                console.log(err);
                sweetalert({
                    text: err.response.data.message,
                    icon: 'warning'
                })
            })
        }
    },
}
</script>

<style scoped></style>