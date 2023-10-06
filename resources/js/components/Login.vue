<template>
    <center>
        <h1>Login page here</h1>
        <form>
            <label for="name">Name</label>
            <input type="text" name="name" v-model="user.name"/>
            <label for="email">Email</label>
            <input type="email" v-model="user.email"/>
        </form>
        <button @click="login()">Login</button>
    </center>
</template>

<script setup>
    import {ref, onMounted, reactive} from "vue"
    import {useRouter} from "vue-router"

    const router = useRouter()

    const user = reactive({
        name : '',
        email : ''
    })

    const login = () => {
      //  router.push({name : 'Home', query: {id : 1}})
        console.log("user that I input")
        console.log(user)
        router.push({name : 'Home'})
    }
</script>