import { createRouter,createWebHistory } from "vue-router";

import Home from "./components/Home.vue"
import About from "./components/About.vue"
import Contact from "./components/Contact.vue"
import Login from "./components/Login.vue"
import Post from "./components/Post.vue"
import DetailPost from "./components/DetailPost.vue"

const routes = [
    {path: '/',        component: Home,        name : 'Home'},
    {path: '/about',   component: About,       name : 'About'},
    {path: '/contact', component : Contact,    name: 'Contact'},
    {path: '/login',   component : Login,      name: 'Login'},
    {path: '/post',    component : Post,       name: 'Post'},
    {path: '/post/:id', component : DetailPost, name : 'DetailPost'}
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router;