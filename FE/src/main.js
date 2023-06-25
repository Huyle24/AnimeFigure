import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store';



// import các dependencies và components tại đây

createApp(App).use(store).use(router).mount('#app')
