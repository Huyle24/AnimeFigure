<template>
  <div class="card" style="height: 500px; margin-bottom: 20px">
    <div class="embed-responsive embed-responsive-16by9">
      <div class="card-img" style="background-color: black; height: 400px">
        <img
          class="card-img-top embed-responsive-item"
          :src="product.imageURL"
          alt="Product Image"
        />
      </div>
    </div>
    <div class="card-body">
      <router-link :to="{ name: 'ShowDetails', params: { id: product.id } }">
        <h5 class="card-title" style="color: black; height: 50px">
          {{ product.name }}
        </h5>
      </router-link>
      <p class="card-text" style="color: red">
        <sup></sup>{{ product.price }}.000đ
      </p>
      <p class="card-text font-italic" style="max-height: 100px">
        {{ product.description.slice(0, 58) }}...
      </p>
      <router-link
        id="edit-product"
        :to="{ name: 'EditProduct', params: { id: product.id } }"
        v-show="$route.name == 'ProductAdmin'"
      >
        <button class="btn btn-primary">Chỉnh sửa</button>
      </router-link>
      <button
        class="btn btn-danger"
        v-show="$route.name == 'ProductAdmin'"
        @click="deleteProduct"
      >
        Delete
      </button>
    </div>
  </div>
</template>
<script>
import swal from "sweetalert";
const axios = require("axios");
import { apiUrl } from "@/config/config";

export default {
  name: "ProductBox",
  props: ["product"],
  data() {
    return {
      token: null,
    };
  },
  methods: {
    showDetails() {
      this.$router.push({
        name: "ShowDetails",
        params: { id: this.product.id },
      });
    },
    async deleteProduct() {
      const willDelete = await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this product!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (willDelete) {
        try {
          axios
            .delete(`${apiUrl}product/${this.product.id}?token=${this.token}`)
            .then(
              (response) => {
                if (response.status == 200) {
                  swal({
                    text: "Product delete!",
                    icon: "success",
                    closeOnClickOutside: false,
                  });

                  // refresh nav bar
                  this.$emit("productDeleted"); // bắn sự kiện productDeleted
                  this.$router.push({ name: "ProductAdmin" });
                } else {
                  swal("Poof! Your product has been deleted!", {
                    icon: "success",
                  });
                }
              },
              (error) => {
                console.log(error);
              }
            );

          this.loadProducts();
        } catch (error) {
          swal(
            "Oops...",
            "Failed to delete the product. " + error.response.data.message,
            "error"
          );
        }
      }
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
  },
};
</script>

<style scoped>
.card .embed-responsive {
  height: 300px;
  width: 100%;
  overflow: hidden;
}

.card .card-img {
  height: 300px;
  overflow: hidden;
}

.card .card-img img {
  transition: all 0.3s;
}

.card .card-img:hover img {
  transform: scale(1.2);
}
</style>
