
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-3 d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style="width: 280px;">
                <NavbarAdmin :active="active"></NavbarAdmin>
            </div>
            <div class="col-9">
                <div class="card">
                    <h1>Edit User </h1>
                    <form @submit.prevent="saveUser">
                        <div>
                            <label for="first-name">First Name:</label>
                            <input type="text" id="first-name" v-model="user.firstName" required>
                        </div>
                        <div>
                            <label for="last-name">Last Name:</label>
                            <input type="text" id="last-name" v-model="user.lastName" required>
                        </div>
                        <div>
                            <label for="email">Email:</label>
                            <input type="email" id="email" v-model="user.email" required>
                        </div>
                        <div>
                            <label for="role">Role:</label>
                            <select id="role" v-model="user.role" required>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div>
                            <button type="submit">Save</button>
                            <button @click="cancelEdit">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable vue/multi-word-component-names */
const axios = require("axios");
import { apiUrl } from "@/config/config";
import NavbarAdmin from "../../../components/Navbar/NavbarAdmin.vue"
export default {
    name: 'EditUserManager',
    components: { NavbarAdmin },
    data() {
        return {
            token: localStorage.getItem("token"),
            active: 4,
            baseURL: apiUrl,
            user: {},
            id: null
        };
    },

    methods: {

        async getUSer() {
            // Điều hướng đến trang chỉnh sửa người dùng với ID của người dùng
            await axios.get(this.baseURL + 'user/' + this.id + '?token=' + this.token)
                .then(response => {
                    this.user = response.data;
                    console.log(response.data);
                }).catch(error => {
                    console.log(error);
                });
        },
        async saveUser() {
            // Gọi phương thức HTTP để lưu thông tin người dùng được chỉnh sửa lên máy chủ
            // Sử dụng thư viện Axios để gửi yêu cầu HTTP PUT
            await axios.put(this.baseURL + 'user/updateuseradmin/' + this.id + '?token=' + this.token, this.user)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({
                        name: "UserManager",
                    });
                }).catch(error => {
                    console.log(error);
                });
        },
    },


    mounted() {
        this.id = this.$route.params.id;
        this.getUSer();
    }
}
</script>

<style scoped></style>