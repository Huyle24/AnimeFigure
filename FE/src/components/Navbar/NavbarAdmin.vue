<template>
    <router-link :to="{ name: 'AdminView' }"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <svg class="bi pe-none me-2" width="40" height="32">

        </svg>
        <span class="fs-4">Admin page</span>
    </router-link>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
            <router-link :to="{ name: 'AdminView' }" class="nav-link" :class="{ active: active == 0 }" aria-current="page">
                <svg class="bi pe-none me-2" width="16" height="16">
                    <use xlink:href="#home"></use>
                </svg>
                Home
            </router-link>
        </li>
        <li>
            <router-link :to="{ name: 'CategoryAdmin' }" class="nav-link link-body-emphasis"
                :class="{ active: active == 1 }">
                <svg class="bi pe-none me-2" width="16" height="16">
                    <use xlink:href="#speedometer2"></use>
                </svg>
                Category
            </router-link>
        </li>
        <li>
            <router-link :to="{ name: 'ProductAdmin' }" class="nav-link link-body-emphasis" :class="{ active: active == 2 }">
                <svg class="bi pe-none me-2" width="16" height="16">
                    <use xlink:href="#table"></use>
                </svg>
                Product
            </router-link>
        </li>
        <li>
            <router-link :to="{ name: 'OrderAdmin' }"  class="nav-link link-body-emphasis" :class="{ active: active == 3 }">
                <svg class="bi pe-none me-2" width="16" height="16">
                    <use xlink:href="#grid"></use>
                </svg>
                Order
            </router-link>
        </li>
        <li>
            <router-link :to="{ name: 'UserManager' }" class="nav-link link-body-emphasis" :class="{ active: active == 4 }">
                <svg class="bi pe-none me-2" width="16" height="16">
                    <use xlink:href="#people-circle"></use>
                </svg>
                Customers
            </router-link>
        </li>
    </ul>
</template>
<script>
export default {
    name: "NavbarAdmin",
    props: {
        active: Number,
    },
}
</script>