<template>
  <div class="card" style="width: 18rem; height: 450px; margin-bottom: 20px">
    <div class="card-img" style="background-color: black; height: 400px">
      <img :src="category.imageUrl" class="card-img-top" alt="..." />
    </div>
    <div class="card-body">
      <router-link :to="{ name: 'ListProducts', params: { id: category.id } }">
        <h5 class="card-title">{{ category.categoryName }}</h5>
      </router-link>
      <p class="card-text" style="max-height: 100px">
        {{ category.description.slice(0, 58) }}
      </p>
      <router-link
        :to="{ name: 'EditCategory', params: { id: category.id } }"
        v-show="$route.name == 'CategoryAdmin'"
      >
        <button href="#" class="btn btn-primary">Chỉnh sửa</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryBox",
  props: ["category"],
  methods: {},
};
</script>
<style scoped>
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
