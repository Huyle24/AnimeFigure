<template>
  <NavBar
    :products_num="products_num"
    v-if="
      ![
        'SignupUpForm',
        'SigninUpForm',
        'CheckOutMobile',
        'MobileCheckouTrue',
      ].includes($route.name)
    "
  />
  <NavbarSearch
    v-if="
      ![
        'SignupUpForm',
        'SigninUpForm',
        'CheckOutMobile',
        'MobileCheckouTrue',
      ].includes($route.name)
    "
  />
  <router-view
    v-if="products && categories"
    :baseURL="baseURL"
    :role="role"
    :products="products"
    :categories="categories"
    @fetchData="fetchData"
  >
  </router-view>
  <Footer
    v-if="
      ![
        'SignupUpForm',
        'SigninUpForm',
        'CheckOutMobile',
        'MobileCheckouTrue',
      ].includes($route.name)
    "
  />
</template>

<script>

import { apiUrl } from "@/config/config";
const axios = require("axios");
import NavBar from "@/components/Navbar/Navbar.vue";
import NavbarSearch from "@/components/Navbar/NavbarSearch.vue";
import Footer from "@/components/Footer.vue";
import { mapState } from 'vuex'

// import '~mdb-ui-kit/css/mdb.min.css';

export default {
  name: 'App',
  components: {
    NavBar, NavbarSearch, Footer
  },
  computed: {
    ...mapState(['count'])
  },
  data() {
    return {
      baseURL: apiUrl,
      //baseURL: "http://localhost:8080/",
      products: null,
      categories: null,
      key: 0,
      token: null,
      cartCount: 0,
      products_num: 0,
      role: "user",
    };
  },
  methods: {
    async fetchData() {
      // fetch products
      await axios
        .get(this.baseURL + 'product/')
        .then((res) => { console.log("long",res.data.content ); return this.products = res.data.content.sort((a, b) => a.id - b.id)})
        .catch((err) => console.log(err));

      //fetch categories
      await axios
        .get(this.baseURL + 'category/')
        .then((res) => (this.categories = res.data))
        .catch((err) => console.log(err));



      //fetch cart items
      if (this.token) {
        await axios.get(this.baseURL + `cart/?token=${this.token}`).then(
          (response) => {
            if (response.status == 200) {
              // update cart
              this.cartCount = Object.keys(response.data.cartItems).length;
              this.$store.commit('incrementCart', { value: 0, callapi: this.cartCount });
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
      //fetch role
      await axios
        .get(`${apiUrl}user/getrole?token=${this.token}`)
        .then((res) => {
          if (res.data.role == "admin")
            this.$store.commit('setRole', { value: 1 });
        })
        .catch((err) => console.log(err));
    },
    async fetchDataWish() {
      await axios
        .get('${apiUrl}wishlist/' + this.token)
        .then(data => {
          this.products_num = data.data.length;

          this.$store.commit('increment', this.products_num);
        }) // Thay đổi trạng thái trong store })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.fetchData();
    this.fetchDataWish();
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.btn-red {
  background-color: #e5012b;
  color: #fff;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-red:hover {
  background-color: #ff002f;
  color: #fff;
}
</style>
