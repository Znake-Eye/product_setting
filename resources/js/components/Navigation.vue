<template>
    <div class="nav-container flex">
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/contact">Contact</router-link>
        </nav>
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
    var isLogin = ref(true)

    const logout = () => {
        isLogin.value = false
    }
    const login = () => {
        isLogin.value = true
    }

    onMounted(() => {
        console.log("mount Navigate component in the browser")
    })

</script>