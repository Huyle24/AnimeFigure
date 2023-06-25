<template>
    <section style="background-color: #eee;">
        <div class="container py-5">
            <div class="row">

                <div class="col-lg-8">
                    <div class="card mb-4">
                        <div class="card-body">
                            <form @submit="signup" class="needs-validation">
                                <div class="row g-3">
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
    name: "ChangePassword",
    data() {
        return {
            token: null,
            password: null,
            passwordConfirm: null,
        }
    }, methods: {
        async signup(e) {

            e.preventDefault();
            // if the password matches
            if (this.password === this.passwordConfirm) {
                // make the post body

                // call the API
                await axios
                    .post(`${apiUrl}user/changepassword?token=${this.token}`, { password: this.password })
                    .then(() => {
                        // redirect to home profile
                        this.$router.replace("/profile");
                        swal({
                            text: "Password edit successful.",
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

    },
    mounted() {
        this.token = localStorage.getItem("token");
    }
}
</script>