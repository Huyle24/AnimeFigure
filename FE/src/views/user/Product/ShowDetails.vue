<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-3 d-block d-md-none"></div>
      <div class="col-6 col-md-5 col-xl-4">
        <img
          :src="product.imageURL"
          :alt="product.name"
          class="rounded-2 shadow-sm w-100"
        />
      </div>
      <div class="col-3 d-block d-md-none"></div>
      <div class="col-8">
        <h4>{{ product.name }}</h4>
        <h6 class="category font-italic">{{ category.categoryName }}</h6>
        <h6 class="font-weight-bold" style="color: red">
          {{ product.price }}.000đ
        </h6>
        <p>
          {{ product.description }}
        </p>

        <div class="d-flex flex-row justify-content-between">
          <div class="input-group">
            <div class="input-group-prepend">
              <span
                class="input-group-text"
                id="basic-addon1"
                style="
                  border-top-left-radius: 2;
                  border-bottom-left-radius: 2;
                  padding: 5px;
                  height: 38px;
                "
                >Số lượng</span
              >
            </div>
            <input
              class="form-control"
              type="number"
              v-bind:value="quantity"
              style="border-radius: 0; padding: 5px; height: 38px"
            />
          </div>

          <div class="input-group">
            <button
              type="button"
              id="add-to-cart-button"
              class="btn"
              @click="addToCart(this.id)"
              style="border-top-left-radius: 0; border-bottom-left-radius: 0"
            >
              + 🛒
              <ion-icon name="cart-outline" v-pre></ion-icon>
            </button>
          </div>
        </div>

        <div class="features pt-3">
          <h5><strong>Mô tả</strong></h5>

          <p>{{ product.feature }}</p>
          <ul>
            <br />
            <br />
            CAM KẾT
            <ul style="list-style: none">
              <li>✔ Sản phẩm chính hãng</li>
              <li>✔ 1 đổi 1 trong 7 ngày đối với sản phẩm lỗi</li>
              <li>✔ Giao hàng tận nơi trên toàn quốc</li>
            </ul>
            <br />
            <br />

            ❤️ CẢM ƠN ANH EM ĐÃ CHỌN ONEPIECE WONDERLAND ❤️

            <br />
            Anh em ghé thăm gian hàng để xem được nhiều sản phẩm thú vị nhé‼️
            <br />
            - Shop chuẩn bị hàng trong vòng 1-2 ngày dành cho hàng có sẵn.
            <br />
            - Khách sỉ liên hệ zalo: 0989787394 Onepiece Wonderland Store cam
            kết mang đến cho khách hàng cảm giác hài lòng nhất, nếu không hài
            lòng hãy liên hệ hotline: 0989787394 để được tư vấn và giải quyết
            mọi vấn đề của khách hàng gặp phải ❤️
            <br />
            ☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️
            <br />
            <br />
            <li>Mua hàng trên Shopee: https://shope.ee/3ATWg61vIf</li>
            <li>Trải nghiệm kênh youtube của shop: https://bit.ly/2MQLy9O</li>
            <li>
              Trải nghiệm kênh tiktok của shop: tiktok.com/@marvelstore_hn
            </li>
            <br />
            🕍 Mua hàng trực tiếp tại Marvelstore:
            <li>20/59 Xa lộ Hà Nội - Linh Trung - Thủ Đức - TPHCM</li>
            <li>0989787394</li>
          </ul>
        </div>
        <hr class="my-4" />
        <button
          id="wishlist-button"
          class="btn mr-3 p-1 py-0"
          :class="{ product_added_wishlist: isAddedToWishlist }"
          @click="addToWishList(this.id)"
          style="
            background-color: #febd69;
            font-size: 15px;
            color: white;
            height: 30px;
            width: 250px;
          "
        >
          {{ wishlistString }}
        </button>
        <button
          id="show-cart-button"
          type="button"
          class="btn mr-3 p-1 py-0"
          @click="listCartItems()"
          style="
            background-color: white;
            font-size: 15px;
            border-color: #febd69;
            border: 2px;
            color: #febd69;
            padding: 10px;
            height: 30px;
            width: 250px;
          "
        >
          Xem giỏ hàng

          <ion-icon name="cart-outline" v-pre></ion-icon>
        </button>
      </div>
    </div>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header"><h3>Bình luận</h3></div>
        <div class="card-body">
          <CommentsBox :productId="product.id" :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
const axios = require("axios");
import { apiUrl } from "@/config/config";
import CommentsBox from "@/components/CommentsBox/CommentsBox.vue";

import { mapState, mapGetters } from "vuex";
export default {
  name: "ShowDetail",
  data() {
    return {
      product: {},
      category: {},
      id: null,
      token: null,
      isAddedToWishlist: false,
      wishlistString: "Thêm vào Yêu thích",
      quantity: 1,
    };
  },
  props: ["baseURL", "products", "categories"],
  computed: {
    ...mapState(["count"]),
    ...mapGetters(["getCount"]),
  },
  components: { CommentsBox },
  methods: {
    addToWishList() {
      this.$store.commit("increment");
      axios
        .post(`${this.baseURL}wishlist/add?token=${this.token}`, {
          id: this.product.id,
          name: this.product.name,
          imageURL: this.product.imageURL,
          price: this.product.price,
          description: this.product.description,
          categoryId: this.product.categoryId,
          feature: this.product.feature,
        })
        .then(
          (response) => {
            if (response.status == 201) {
              this.$emit("fetchData");
              this.isAddedToWishlist = true;
              this.wishlistString = "Đã thêm vào yêu thích";
            }
          },
          (error) => {
            console.log(error);
          }
        );
    },
    addToCart(productId) {
      if (!this.token) {
        swal({
          text: "Please log in first!",
          icon: "error",
        });
        return;
      }
      axios
        .post(`${this.baseURL}cart/add?token=${this.token}`, {
          productId: productId,
          quantity: this.quantity,
          quantityBySizes: {},
        })
        .then(
          (response) => {
            if (response.status == 201) {
              swal({
                text: "Product Added to the cart!",
                icon: "success",
                closeOnClickOutside: false,
              });
              // refresh nav bar
              this.$emit("fetchData");
            }
          },
          (error) => {
            console.log(error);
          }
        );
    },

    listCartItems() {
      axios.get(`${this.baseURL}cart/?token=${this.token}`).then(
        (response) => {
          if (response.status === 200) {
            this.$router.push("/cart");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async getProduct() {
      await axios
        .get(`${apiUrl}product/getproduct/${this.id}`)
        .then((res) => {
          this.product = res.data;
          this.category = this.categories.find(
            (category) => category.id == this.product.categoryId
          );
        })
        .catch((erro) => console.log(erro));
    },
  },
  mounted() {
    this.id = this.$route.params.id;

    this.getProduct();

    this.category = this.categories.find(
      (category) => category.id == this.product.categoryId
    );
    this.token = localStorage.getItem("token");
  },
};
</script>

<style>
.category {
  font-weight: 400;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */

#add-to-cart-button {
  background-color: #febd69;
  font-size: 20px;
}

#wishlist-button {
  background-color: #b9b9b9;
  border-radius: 0;
}

#show-cart-button {
  background-color: #131921;
  color: white;
  border-radius: 0;
}
</style>
