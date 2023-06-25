
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-3 d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style="width: 280px;">
                <NavbarAdmin :active="active"></NavbarAdmin>
            </div>
            <div class="col-9">
                <div class="card">
                    <h1>Edit Users</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{ user.id }}</td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td>
                                    <button @click="editUser(user)">Edit</button>
                                    <button @click="deleteUser(user)">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
    name: 'UserManager',
    components: { NavbarAdmin },
    data() {
        return {
            token: null,
            active: 4,
            baseURL: apiUrl,
            users: null
        };
    },

    methods: {
        async fetchUsers() {
            // Gọi phương thức HTTP để lấy tất cả các người dùng từ máy chủ
            // Sử dụng thư viện Axios để gửi yêu cầu HTTP GET
            await axios.get(this.baseURL + `user/all?token=${this.token}`)
                .then(response => {
                    this.users = response.data;
                }).catch(error => {
                    console.log(error);
                });
        },
        editUser(user) {
            // Điều hướng đến trang chỉnh sửa người dùng với ID của người dùng
            this.$router.push({
                name: "EditUserManager",
                params: { id: user.id },
            });
        },
        async deleteUser(user) {
            // Gọi phương thức HTTP để xóa người dùng khỏi máy chủ
            // Sử dụng thư viện Axios để gửi yêu cầu HTTP DELETE
            await axios.delete(this.baseURL + 'user/' + user.id + `?token=${this.token}`)
                .then(response => {
                    // Xóa người dùng khỏi mảng dữ liệu Vue
                    console.log(response);
                    const index = this.users.indexOf(user);
                    if (index > -1) {
                        this.users.splice(index, 1);
                    }
                }).catch(error => {
                    console.log(error);
                });
        }
    },

    mounted() {
        this.token = localStorage.getItem("token");
        this.fetchUsers();
    }
}
</script>

<style scoped></style>