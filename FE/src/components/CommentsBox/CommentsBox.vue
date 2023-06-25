<template>
  <div>
    <h4></h4>
    <div>
      <form @submit.prevent="addComment">
        <h5>Thêm bình luận:</h5>
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">⭐</span>
          <input
            type="text"
            class="form-control"
            placeholder="Thêm số sao "
            v-model="rate"
            aria-describedby="addon-wrapping"
          />
        </div>
        <div class="form-group">
          <textarea
            class="form-control"
            v-model="newComment"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          class="btn btn-primary float-end"
          style="display: inline-block"
        >
          Lưu bình luận
        </button>
      </form>
    </div>
    <div v-if="comments.length > 0" style="display: block">
      <div class="card mb-2" v-for="comment in comments" :key="comment.id">
        <div class="card-body">
          <h6 class="card-title" style="font-weight: bold">
            {{ comment.user.lastName + comment.user.firstName }}
          </h6>
          <span>{{ comment.rating }}⭐</span>
          <p class="card-text">{{ comment.content }}</p>
          <small class="text-muted">{{ formatDate(comment.date) }}</small>
          <div
            class="float-end"
            v-show="
              this.lastName + this.firstName ==
              comment.user.lastName + comment.user.firstName
            "
          >
            <button
              class="btn btn-outline-secondary btn-sm mx-1"
              @click="editComment(comment)"
            >
              Chỉnh sửa
            </button>
            <button
              class="btn btn-outline-danger btn-sm mx-1"
              @click="deleteComment(comment)"
            >
              Xóa
            </button>
          </div>
          <div v-if="editing">
            <div class="card mb-2">
              <div class="card-body">
                <h5 class="card-title">Chỉnh sửa bình luận</h5>
                <form>
                  <div class="form-group">
                    <label for="edit-comment">Bình luận :</label>
                    <textarea
                      class="form-control"
                      id="edit-comment"
                      v-model="editedComment.content"
                      required
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="edit-rating">Đánh giá: </label>
                    <input
                      type="text"
                      class="form-control"
                      id="edit-rating"
                      v-model="editedComment.rating"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary mx-1"
                    @click.prevent="saveComment()"
                  >
                    Lưu
                  </button>
                  <button
                    class="btn btn-outline-secondary mx-1"
                    @click.prevent="cancelEdit()"
                  >
                    Thoát
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Sản phẩm chưa được bình luận</div>
  </div>
</template>

<script>
const axios = require("axios");
import { apiUrl } from "@/config/config";

export default {
  name: "CommentsBox",
  props: ["productId", "product"],
  data() {
    return {
      token: null,
      comments: [],
      newComment: "",
      id: null,
      rate: null,
      editing: false,
      editedComment: null,
      lastName: "",
      firstName: "",
    };
  },
  methods: {
    async loadComments() {
      try {
        let response = await axios.get(
          `${apiUrl}products/${this.id}/comments/`
        );
        this.comments = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString("en-US", options);
    },
    async addComment() {
      try {
        const response = await axios.post(
          `${apiUrl}products/${this.id}/comments?token=${this.token}`,
          {
            content: this.newComment,
            rating: this.rate,
            product: {},
          }
        );
        this.newComment = "";
        this.loadComments();
        this.comments.unshift(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    editComment(comment) {
      this.editedComment = Object.assign({}, comment);
      this.editing = true;
    },
    saveComment() {
      if (this.editing) {
        axios
          .put(
            `${apiUrl}products/${this.productId}/comments/${this.editedComment.id}?token=${this.token}`,
            this.editedComment
          )
          .then((response) => {
            const index = this.comments.findIndex(
              (comment) => comment.id === response.data.id
            );
            if (index >= 0) {
              this.comments.splice(index, 1, response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.editing = false;
            this.editedComment = null;
          });
      }
    },
    deleteComment(comment) {
      if (
        confirm(
          `Are you sure you want to delete the comment "${comment.content}"?`
        )
      ) {
        axios
          .delete(
            `${apiUrl}products/${this.productId}/comments/${comment.id}?token=${this.token}`
          )
          .then((response) => {
            console.log(response);
            const index = this.comments.findIndex(
              (cmt) => cmt.id === comment.id
            );
            if (index >= 0) {
              this.comments.splice(index, 1);
            }
            this.loadComments();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    cancelEdit() {
      this.editing = false;
      this.editedComment = null;
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.token = localStorage.getItem("token");
    this.firstName = localStorage.getItem("firstName");
    this.lastName = localStorage.getItem("lastName");
    this.loadComments();
    console.log(this.lastName + this.firstName);
  },
};
</script>

<style scoped></style>
