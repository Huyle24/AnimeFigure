<template>
  <nav
    class="navbarsearch navbar bg-body-tertiary"
    :class="{ 'navbarsearch--fixed': navbarFixed }"
  >
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'Home' }">
        <img
          src="../../assets/logo/logo1.png"
          class="d-none d-md-block ms-3"
          style="width: 200px"
          alt=""
        />
        <span class="d-none d-md-block"> </span>
      </router-link>
      <form class="d-flex w-75 input-group" @submit="searchmore">
        <input
          type="search"
          class="form-control rounded"
          placeholder="Nhập từ khóa"
          v-model="string"
          aria-label="Search"
          aria-describedby="search-addon"
        />
        <button class="btn btn-search btn-outline-red" type="submit">
          Tìm kiếm
        </button>
        <div class="d-none d-md-flex">
          <CartButton></CartButton>
          <ButtonLoginSignup></ButtonLoginSignup>
        </div>
      </form>
    </div>
  </nav>
</template>

<script>
import ButtonLoginSignup from "@/components/Button/ButtonLoginSignup.vue";
import CartButton from "@/components/Button/CartButton.vue";

export default {
  name: "NavbarSearch",
  data() {
    return {
      navbarFixed: false,
      string: "",
    };
  },
  components: { ButtonLoginSignup, CartButton },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    searchmore(e) {
      e.preventDefault();

      this.$router.push({
        name: "SearchView",
        params: { string: this.string },
      });
    },
    handleScroll() {
      if (window.pageYOffset > 0) {
        this.navbarFixed = true;
      } else {
        this.navbarFixed = false;
      }
    },
  },
};
</script>

<style>
.navbarsearch {
  transition: top 1s, transform 1s;
  /* add transition effect */
  background-color: #e5012b !important;
}
.btn-search:hover {
  background-color: #ff012f !important;
  border: 1px solid #fff;
  color: #fff;
}
.navbarsearch--fixed {
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  z-index: 999;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  /* add slide effect */
  transform: translateY(80px);
  /* apply animation */
  animation: slideDown 1s forwards;
}
.btn-outline-red {
  border: 1px solid #fff;
  color: #fff;
  font-weight: 500;
}

@keyframes slideDown {
  from {
    transform: translateY(-80px);
  }

  to {
    transform: translateY(0);
  }
}
</style>
