import { createRouter,createWebHistory } from "vue-router";

import Home from "./components/Home.vue"
import About from "./components/About.vue"
import Contact from "./components/Contact.vue"
import Login from "./components/Login.vue"
import Post from "./components/Post.vue"
import DetailPost from "./components/DetailPost.vue"
import Calendar from "./components/Calendar.vue"
import Register from "./components/Register.vue"
import Dashboard from "./components/Dashboard.vue"
import NotFound from "./components/NotFound.vue"

const routes = [
    {path: '/',        component: Home,        name : 'Home', meta : {requireAdmin : true}},
    {path: '/register', component: Register, name : 'Register'},
    {path: '/about',   component: About,       name : 'About'},
    {path: '/contact', component : Contact,    name: 'Contact'},
    {path: '/calendar', component : Calendar,  name: 'Calendar'},
    {path: '/login',   component : Login,      name: 'Login'},
    {path: '/post',    component : Post,       name: 'Post'},
    {path: '/post/:id', component : DetailPost, name : 'DetailPost'},
    {path : '/dashboard', component : Dashboard, name : 'Dashboard', meta : {requiresAuth : true}},
    {path: '/notfound', component : NotFound, name : 'notfound'},
]

const router = createRouter({
    history:createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    const  publicPages = ['/login', '/register']
    const authRequired = !publicPages.includes(to.path);
    const auth = JSON.parse(sessionStorage.getItem('user'));

    if (authRequired && !auth) {
      next({name : 'Login'})
    }
    else{
        if(to.meta.requiresAuth){
            let isAuthorize = false
            if(auth){
                auth.role == 'admin' ? isAuthorize = true : isAuthorize = false
            }
            if(isAuthorize){
                next()
            }
            else{
                next({ name: 'notfound' })
            }
        }
        next()
    }
  
   
});

export default router;