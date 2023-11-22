<template>
    <div class="bg-blue-500 flex justify-between p-3">
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/contact">Contact</router-link>
            <router-link to="post">Post</router-link>
            <router-link to="/calendar">Calendar</router-link>
        </nav>
        <div class="time">
            {{ dateString }} -- {{ time }}
        </div>
        <div v-if="isLogin">
            <button @click="logout()">Logout</button>
        </div>
        <div v-else>
            <button @click="login()">Login</button>
        </div>
        
    </div>
   
</template>
<script setup>
    import { ref,onMounted, computed } from "vue";
    import {useRouter} from "vue-router"

    const dateString = ref('')
    const time = ref('')



    const date = new Date()
    dateString.value = date.toLocaleDateString()
    time.value = date.toLocaleTimeString()

    const router = useRouter()
    var isLogin = ref(true)

    const logout = () => {
        isLogin.value = false
        router.push({name : 'Login', query:{}})
    }
    const login = () => {
        isLogin.value = true
    }

    //mounted method
    onMounted(() => {
        console.log("mount Navigate component in the browser")
        setInterval(() => {
            time.value = new Date().toLocaleTimeString()
        }, 1000)
    })

</script>