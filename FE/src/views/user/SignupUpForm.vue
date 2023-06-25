<template>
    <section class="py-5" style="background-color: #eee;">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style="border-radius: 25px;">
                        <div class="card-body p-md-5">
                            <div class="row justify-content-center">
                                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>


                                    <form @submit="signup" class="needs-validation">
                                        <div class="row g-3">
                                            <div class="col-sm-6">
                                                <label for="firstName" class="form-label">First name</label>
                                                <input type="text" class="form-control" id="firstName" placeholder=""
                                                    v-model="firstName" required>
                                                <div class="invalid-feedback">
                                                    Valid first name is required.
                                                </div>
                                            </div>

                                            <div class="col-sm-6">
                                                <label for="lastName" class="form-label">Last name</label>
                                                <input type="text" class="form-control" id="lastName" placeholder=""
                                                    v-model="lastName" required>
                                                <div class="invalid-feedback">
                                                    Valid last name is required.
                                                </div>
                                            </div>


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
                                                <label for="exampleInputPassword2" class="form-label">Confirm
                                                    Password</label>
                                                <input type="password" class="form-control" id="exampleInputPassword2"
                                                    v-model="passwordConfirm">
                                            </div>
                                            <div class="col-12">
                                                <input type="checkbox" class="form-check-input" id="same-address">
                                                <label class="form-check-label" for="same-address">I accept the terms &
                                                    conditions</label>
                                            </div>
                                        </div>



                                        <hr class="my-4">

                                        <button class="w-100 btn btn-warning btn-lg mb-5" type="submit">Create
                                            account</button>
                                    </form>

                                    <router-link :to="{ name: 'SigninUpForm' }">
                                        <span type="button" class="px-3 text-center w-100"
                                            data-mdb-ripple-color="light">Already Have an Account?</span>
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
                                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                        class="img-fluid" alt="Sample image">

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
import swal from 'sweetalert';
const axios = require("axios");

export default {
    name: "SignupUpForm",
    props: ["baseURL"],
    data() {
        return {
            email: null,
            firstName: null,
            lastName: null,
            password: null,
            passwordConfirm: null,
        };
    },
    methods: {
        async signup(e) {
            
            e.preventDefault();
            // if the password matches
            if (this.password === this.passwordConfirm) {
                // make the post body
                const user = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password,
                };

                // call the API
                await axios
                    .post(`${this.baseURL}user/signup`, user)
                    .then(() => {
                        // redirect to home page
                        this.$router.replace("/");
                        swal({
                            text: "User signup successful. Please Login",
                            icon: "success",
                            closeOnClickOutside: false,
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                // passwords are not matching
                swal({
                    text: "Error! Passwords are not matching",
                    icon: "error",
                    closeOnClickOutside: false,
                });
            }
        }
    }
};

</script>

<style scoped></style>