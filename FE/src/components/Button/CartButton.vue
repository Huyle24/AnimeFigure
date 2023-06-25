<template>
    <div class="d-flex ms-3">
        <!-- Icon -->
        <router-link class="link-secondary me-3" :to="{ name: 'CartView' }">
            <i class="fas fa-shopping-cart" style="font-size: 22px; color: #fff;"></i>
            <span class="badge rounded-pill badge-notification bg-danger-red">{{ countCart }}</span>
        </router-link>

        <!-- Notifications -->
        <div class="dropdown">
            <a class="link-secondary me-3 dropdown-toggle hidden-arrow" href="#" id="navbarDropdownMenuLink" role="button"
                data-mdb-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi bi-heart-fill"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                </svg>
                <span class="badge rounded-pill badge-notification bg-danger-red">{{ count }}</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                <li>
                    <router-link class="dropdown-item" :to="{ name: 'WishList' }">Withlist</router-link>
                </li>
                <li>
                    <a class="dropdown-item" href="#">Another news</a>
                </li>
                <li>
                    <a class="dropdown-item" href="#">Something else here</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import swal from 'sweetalert';
import { mapState, mapGetters } from 'vuex';

export default {
    name: "CartButton",
    computed: {
        ...mapState(['count', 'countCart', 'role']),
        ...mapGetters(['getCount', 'getCountCart']),
    },
    data() {
        return {
            token: localStorage.getItem("token"),
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
        }
    },
    mounted() {
        this.token = localStorage.getItem("token");

    },
};

</script>

<style scoped>
.bg-danger-red{
    background-color: #ff0000;
}
</style>