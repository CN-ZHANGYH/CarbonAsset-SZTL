import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router/router.js';
import naive from "naive-ui";
import axios from "axios"
// import request from "../src/utils/request";
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import './assets/icon/iconfont'
import './assets/icon/iconfont.css'
import Cookies from 'js-cookie'

const pinia = createPinia();
const app = createApp(App);
app.config.globalProperties.$http = axios;
// app.config.globalProperties.$request = request;
app.use(router);
app.use(naive);
app.use(pinia)
app.mount('#app');
