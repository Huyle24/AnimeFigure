<template>
    <section style="background-color: #eee;">
        <div class="container py-5">
            <div class="row">
                <div class="col-lg-4">
                    <div class="card mb-4">
                        <div class="card-body text-center">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                alt="avatar" class="rounded-circle img-fluid" style="width: 150px;">
                            <h5 class="my-3">{{ user.firstName }}</h5>
                            <p class="text-muted mb-1">{{ user.role }}</p>
                            <p class="text-muted mb-4">no address</p>
                            <div class="d-flex justify-content-center mb-2">
                                <router-link type="button" class="btn btn-primary" :to="{ name: 'EditProfile' }">Edit profile</router-link>
                                <router-link type="button" class="btn btn-outline-primary ms-1" :to="{ name: 'ChangePassword' }">Change password</router-link>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-lg-8">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Full Name</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="text-muted mb-0">{{ user.firstName}} {{ user.lastName }}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Email</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="text-muted mb-0">{{ user.email }}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Phone</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="text-muted mb-0">no phone</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Mobile</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="text-muted mb-0">no mobile</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Address</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="text-muted mb-0">no address</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>
<script>
const axios = require("axios");
import { apiUrl } from "@/config/config";

export default {
    name: "ProfileView",
    data() {
        return {
            token: null,
            user: {}
        }
    }, methods: {
        async getPRofile() {
            await axios.get(`${apiUrl}user/getprofile?token=${this.token}`)
                .then(response => {
                    this.user = response.data;
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    mounted() {
        this.token = localStorage.getItem("token");
        this.getPRofile();
    }
}
</script>