import './bootstrap';
import {createApp} from "vue"
import App from "./components/App.vue"
import Home from "./components/Home.vue"
import About from "./components/About.vue"
import Contact from "./components/Contact.vue"

import router from './router';

//component
import Navigation from "./components/Navigation.vue"


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
app.component('Navigation', Navigation)
app.mount("#app")