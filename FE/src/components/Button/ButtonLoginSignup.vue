<template>
    <!-- login singinup -->
    <div class="rightnavbar" v-if="!token">
        <router-link :to="{ name: 'SigninUpForm' }">
            <button type="button" class="btn btn-tertiary btn-signin px-3" data-mdb-ripple-color="light">Login</button>
        </router-link>
        <router-link :to="{ name: 'SignupUpForm' }">
            <button type="button" class="ms-3 btn btn-signup btn-outline-secondary" data-mdb-ripple-color="dark">
                Signup</button>
        </router-link>

    </div>
    <!-- Avatar -->
    <div class="dropdown" v-if="token">
        <a class="dropdown-toggle d-flex align-items-center hidden-arrow" href="#" id="navbarDropdownMenuAvatar"
            role="button" data-mdb-toggle="dropdown" aria-expanded="false">
            <img src="../../assets/logo/logo.png" class="rounded-circle" height="25" alt="Black and White Portrait of a Man"
                loading="lazy" />
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
            <li>
                <router-link :to="{ name: 'OrderView' }" class="dropdown-item" href="#">Your order</router-link>
            </li>
            <li v-if="role">
                <router-link class="dropdown-item" :to="{ name: 'AdminView' }">Admin</router-link>
            </li>
            <li>
                <router-link class="dropdown-item" href="#" :to="{ name: 'ProfileView' }">Settings</router-link>
            </li>
            <li>
                <a class="dropdown-item" href="#" @click="signout">Logout</a>
            </li>
        </ul>
    </div>
</template>
  
<script>
import { apiUrl } from '@/config/config';
import swal from 'sweetalert';
import { mapState, mapGetters } from 'vuex';
const axios = require("axios");

export default {
    name: "ButtonLoginSignup",
    computed: {
        ...mapState(['count', 'countCart', 'role']),
        ...mapGetters(['getCount', 'getCountCart', 'getRole']),
    },
    data() {
        return {
            token: null,
        };
    },
    methods: {
        signout() {
            localStorage.removeItem("token");
            this.token = null;
            // this.$emit("resetCartCount");
            this.$router.push({ name: "Home" });
            swal({
                text: "Logged you out. Visit Again",
                icon: "success",
                closeOnClickOutside: false,
            });
        },
        async getrole() {
            await axios
                .get(`${apiUrl}user/getrole?token=${this.token}`)
                .then((res) => {
                    if (res.data.role == "admin")
                        this.$store.commit('setRole', { value: 1 });
                })
                .catch((err) => console.log(err));
        }
    },
    mounted() {
        this.token = localStorage.getItem("token");
        //fetch role
        this.getrole();
    },
};

</script>


<style scoped>
.btn-signin {
    background-color: #fff;
    color: #ff0000;
    font-weight: 600;
}

.btn-signup {
    font-weight: 600;
    color: #fff;
}
</style>