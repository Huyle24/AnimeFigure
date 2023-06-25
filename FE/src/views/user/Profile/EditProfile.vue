<template>
    <section style="background-color: #eee;">
        <div class="container py-5">
            <div class="row">

                <div class="col-lg-8">
                    <div class="card mb-4">
                        <div class="card-body">
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

                                </div>
                                <hr class="my-4">

                                <button class="w-100 btn btn-danger btn-lg mb-5" type="submit">Accept</button>
                            </form>
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
import swal from 'sweetalert';

export default {
    name: "EditProfile",
    data() {
        return {
            token: null,
            email: null,
            firstName: null,
            lastName: null,
        }
    }, methods: {
        async getPRofile() {
            await axios.get(`${apiUrl}user/getprofile?token=${this.token}`)
                .then(response => {
                    this.user = response.data;
                    this.email = this.user.email
                    this.firstName = this.user.firstName
                    this.lastName = this.user.lastName
                })
                .catch(error => {
                    console.log(error);
                })
        },
        async signup(e) {

            e.preventDefault();
            // if the password matches
            // make the post body
            const user = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
            };

            // call the API
            await axios
                .post(`${apiUrl}user/editprofile?token=${this.token}`, user)
                .then(() => {
                    // redirect to home profile
                    this.$router.replace("/profile");
                    swal({
                        text: "User edit successful.",
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
        this.token = localStorage.getItem("token");
        this.getPRofile();
    }
}
</script>