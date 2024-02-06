import './bootstrap';
import {createApp} from "vue"
import App from "./components/App.vue"
import Home from "./components/Home.vue"
import About from "./components/About.vue"
import Contact from "./components/Contact.vue"

import VueApexCharts from "vue3-apexcharts";
import router from './router';
import vue3GoogleLogin from 'vue3-google-login'
//component
import Navigation from "./components/Navigation.vue"
import axios from 'axios';
axios.defaults.withCredentials = true

const CLIENT_ID = '737333897871-7on1ugnqd7pehfc8tt2ph1hdcc2vlvm5.apps.googleusercontent.com'


// const router = createRouter({
//     history:createWebHistory(),
//     routes: [
//         {path: '/', component:Home, name : 'Home'},
//         {path: '/about', component: About, name : 'About'},
//         {path: '/contact', component: Contact, name : 'Contact'}
//     ]
// })


const app = createApp(App)
app.use(router)
app.use(VueApexCharts)
app.use(vue3GoogleLogin, {clientId : CLIENT_ID})
app.component('Navigation', Navigation)
app.mount("#app")