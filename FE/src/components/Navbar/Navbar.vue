<template>
  <nav
    class="navigation navbar navbar-expand-lg navbar-dark"
    aria-label="Offcanvas navbar large"
  >
    <div class="container-fluid">
      <div class="nav-bard d-none d-md-block">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          Hotline: 0817764291 | Email: onpiecewonderland@gmail.com
        </ul>
      </div>
      <button
        class="btn btn-outline-light border border-white navbar-toggler pt-0 pb-1 px-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar2"
        aria-controls="offcanvasNavbar2"
        aria-label="Toggle navigation"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-justify"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>
      <div class="d-flex d-md-none">
        <CartButton></CartButton>
        <ButtonLoginSignup></ButtonLoginSignup>
      </div>
      <div
        class="offcanvas offcanvas-end text-bg-dark"
        tabindex="-1"
        id="offcanvasNavbar2"
        aria-labelledby="offcanvasNavbar2Label"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbar2Label">Menu</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item" :class="{ active: $route.name == 'Home' }">
              <router-link class="nav-link text-black" :to="{ name: 'Home' }"
                >Trang chủ</router-link
              >
            </li>

            <li class="nav-item" :class="{ active: $route.name == 'Category' }">
              <router-link
                class="nav-link text-black"
                :to="{ name: 'Category' }"
                >Loại sản phẩm</router-link
              >
            </li>

            <li class="nav-item" :class="{ active: $route.name == 'Product' }">
              <router-link class="nav-link text-black" :to="{ name: 'Product' }"
                >Sản phẩm</router-link
              >
            </li>
            <li class="nav-item" :class="{ active: $route.name == 'about' }">
              <router-link class="nav-link text-black" :to="{ name: 'about' }"
                >Cửa hàng</router-link
              >
            </li>
            <li class="nav-item" :class="{ active: $route.name == 'NewsView' }">
              <router-link
                class="nav-link text-black"
                :to="{ name: 'NewsView' }"
                >Tin tức</router-link
              >
            </li>
            <!-- <li class="nav-item" :class="{ 'active': $route.name == 'CareerView' }">
                            <router-link class="nav-link text-black" :to="{ name: 'CareerView' }">Career</router-link>
                        </li> -->
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import swal from "sweetalert";
import { mapState, mapGetters } from "vuex";
import ButtonLoginSignup from "../../components/Button/ButtonLoginSignup.vue";
import CartButton from "../../components/Button/CartButton.vue";

export default {
  name: "NavBar",
  computed: {
    ...mapState(["count", "countCart", "role"]),
    ...mapGetters(["getCount", "getCountCart"]),
  },
  props: {
    active: Number,
  },
  components: { ButtonLoginSignup, CartButton },
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
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
  },
};
</script>
<style>
.navigation,
.text-bg-dark {
  background-color: #fabb00 !important;
}

.navigation .rightnavbar button,
.navigation {
  font-size: 14px;
  text-transform: none;
}

.navigation .active {
  font-weight: 600;
}
</style>
