<template>
    <div class="row">
        <div class="col-3 d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style="width: 280px;">
            <NavbarAdmin :active="active"></NavbarAdmin>
        </div>
        <div class="col-9">
            hi!!!!!!!!!!!!!!!!!
        </div>
    </div>
</template>
<script>
import NavbarAdmin from "../../components/Navbar/NavbarAdmin.vue"
import { mapState, mapGetters } from 'vuex';

export default {
    name: "AdminView",
    components: { NavbarAdmin },
    computed: {
        ...mapState(['count', 'countCart', 'role']),
        ...mapGetters(['getCount', 'getCountCart']),
    },
    data() {
        return {
            active: 0,
        }
    },
    mounted(){
        if(!this.role){
            this.$router.replace("/");
        }
    }

    
}
</script> 