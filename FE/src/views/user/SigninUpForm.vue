<template>
    <section class="" style="background-color: #eee;">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style="border-radius: 25px;">
                        <div class="card-body p-md-5">
                            <div class="row justify-content-center">
                                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center">

                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                        class="img-fluid" alt="Sample image">

                                </div>
                                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>
                                    <form class="needs-validation" @submit="signin" novalidate="">
                                        <div class="row g-3">

                                            <div class="col-12">
                                                <label for="email" class="form-label">Email <span
                                                        class="text-body-secondary">(Optional)</span></label>
                                                <input type="email" class="form-control" id="email" v-model="email"
                                                    placeholder="you@example.com">
                                                <div class="invalid-feedback">
                                                    Please enter a valid email address for shipping updates.
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                                <input type="password" class="form-control" id="exampleInputPassword1"
                                                    v-model="password">
                                            </div>
                                            <div class="col-12">
                                                <button class="w-100 btn btn-warning btn-lg mb-5 "
                                                    type="submit">Login</button>
                                                <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                                <form @submit="forgotpassword" class="needs-validation">
                                                    <span>* Please input email</span>
                                                    <button class="btn btn-outline-danger btn-lg mb-5" type="submit">Forgot
                                                        password</button>
                                                </form>
                                            </div>
                                        </div>

                                    </form>
                                    <router-link :to="{ name: 'SignupUpForm' }">
                                        <span type="button" class="px-3 text-center w-100"
                                            data-mdb-ripple-color="light">Don't have account?</span>
                                    </router-link>
                                    <div class="text-center">

                                        <p>or sign in with:</p>
                                        <button type="button"
                                            class="btn btn-link btn-outline-warning btn-floating text-warning mx-3">
                                            <i class="fab fa-facebook-f"></i>
                                        </button>

                                        <button type="button"
                                            class="btn btn-link btn-outline-warning btn-floating text-warning mx-3">
                                            <i class="fab fa-google"></i>
                                        </button>

                                    </div>


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
import swal from 'sweetalert';
import { apiUrl } from "@/config/config";


export default {
    name: "SigninUpForm",
    props: ["baseURL"],
    data() {
        return {
            email: null,
            password: null,
            loading: null,
        };
    },
    methods: {
        async signin(e) {
            e.preventDefault();
            this.loading = true;

            const user = {
                email: this.email,
                password: this.password,
            };

            await axios
                .post(`${this.baseURL}user/signIn`, user)
                .then((res) => {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("firstName", res.data.firstName);
                    localStorage.setItem("lastName", res.data.lastName);
                    this.$emit("fetchData");
                    this.$router.push({ name: "Home" });
                })
                .catch((err) => {
                    swal({
                        text: "Unable to Log you in!",
                        icon: "error",
                        closeOnClickOutside: false,
                    });
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        async forgotpassword(e) {
            e.preventDefault();
            await axios
                .post(`${apiUrl}user/resetpassword?email=${this.email}`)
                .then(() => {
                    // redirect to home profile
                    this.$router.replace("/");
                    swal({
                        text: "Check mail.",
                        icon: "success",
                        closeOnClickOutside: false,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });

        }
    },
    mounted() {
        this.loading = false;
    },
};
</script >