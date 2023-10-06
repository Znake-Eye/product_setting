import { createRouter,createWebHistory } from "vue-router";

import Home from "./components/Home.vue"
import About from "./components/About.vue"
import Contact from "./components/Contact.vue"

const routes = [
    {path: '/', component: Home, name : 'Home'},
    {path: '/about', component: About, name : 'About'},
    {path: '/contact', component : Contact, name: 'Contact'}
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router;