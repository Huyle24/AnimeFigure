<template>
    <div class="container text-center bg-dark text-light">
        <h1>You will be redirected to payment page</h1>

        <div class="alert alert-primary w-100 text-center">
            While making payment use card number 4242424242424242 and enter random
            cvv(3 digit)
        </div>

        <button class="btn btn-success" id="proceed-to-checkout" @click="goToCheckout()">
            Make payment
        </button>
    </div>
</template>
<script>
const axios = require('axios');
import { apiUrl } from '@/config/config';



export default {
    data() {
        return {
            stripeAPIToken: process.env.VUE_APP_STRIPETOKEN,
            stripe: '',
            token: null,
            sessionId: null,
            checkoutBodyArray: [],
        };
    },

    name: 'CheckOutMobile',
    props: ['baseURL'],
    methods: {
        /*
          Configures Stripe by setting up the elements and
          creating the card element.
        */
        configureStripe() { },

        getAllItems() {
            axios.get(`${apiUrl}cart/?token=${this.token}`).then(
                (response) => {
                    if (response.status == 200) {
                        let products = response.data;
                        console.log(products);
                        let len = Object.keys(products.cartItems).length;
                        for (let i = 0; i < len; i++)
                            this.checkoutBodyArray.push({
                                imageUrl: products.cartItems[i].product.imageURL,
                                productName: products.cartItems[i].product.name,
                                quantity: products.cartItems[i].quantity,
                                price: products.cartItems[i].product.price,
                                productId: products.cartItems[i].product.id,
                                userId: products.cartItems[i].userId,
                            });
                        axios
                            .post(
                                apiUrl + 'order/create-checkout-session/pc',
                                this.checkoutBodyArray
                            )
                            .then((response) => {
                                localStorage.setItem('sessionId', response.data.sessionId);
                                return response.data;
                            })
                            .then((session) => {
                                return this.stripe.redirectToCheckout({
                                    sessionId: session.sessionId,
                                });
                            });

                    }
                    console.log(this.checkoutBodyArray);
                },
                (err) => {
                    console.log(err);
                }
            );
        },

        goToCheckout() {
            axios
                .post(
                    apiUrl + 'order/create-checkout-session/pc',
                    this.checkoutBodyArray
                )
                .then((response) => {
                    localStorage.setItem('sessionId', response.data.sessionId);
                    return response.data;
                })
                .then((session) => {
                    return this.stripe.redirectToCheckout({
                        sessionId: session.sessionId,
                    });
                });
        },
    },
    mounted() {
        this.token = this.$route.params.token;
        // get all the cart items
        this.getAllItems();
        this.stripe = window.Stripe(this.stripeAPIToken);

    },
};
</script>
  
