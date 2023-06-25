<template>
  <div class="text-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>
  
<script>
const axios = require('axios');
export default {
  name: 'SuccessPayment',
  props: ["baseURL"],
  data() {
    return {
      token: null,
      sessionId: null
    }
  },
  methods: {
    saveOrder() {
      axios.post(this.baseURL + "order/add?token=" + this.token + "&sessionId=" + this.sessionId, {
        "phone": "string",
        "fullname": "string",
        "addpress": "string",
        "shipcod": true
      })
        .then(() => {
          window.location.href = '/order'
        }).catch((error) => {
          console.log(error);
        })
    }
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.sessionId = localStorage.getItem("sessionId");
    this.saveOrder()
  }
}
</script>