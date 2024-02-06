<template>

<h1 class="text-center"></h1>
<form>
    <label>Firstname</label>
    <input v-model="form.firstname" type="text" />
    <br/>
    <label>Lastname</label>
    <input v-model="form.lastname" type="text" />
    <br/>
    <label>Username</label>
    <input v-model="form.username" type="text" />
    <br/>
    <label>email</label>
    <input v-model="form.email" type="text" />
    <br/>
    <label>Password</label>
    <input v-model="form.password" type="password" />
    <button @click="create()" type="button" >Create Account</button>
</form>
</template>

<script setup>
import {ref, onMounted, reactive} from "vue"
import { useRouter } from "vue-router";
import axios from "axios";
import Auth from "../Auth.js"

const router = useRouter()

const form = reactive({
    firstname : '',
    lastname : '',
    username: '',
    email : '',
    password : ''
})

const create = () => {
    axios.post('api/register', form)
        .then(res => {
            console.log(res.data)
            Auth.login(res.data.access_token,JSON.stringify(res.data.user))
            router.push({name : 'Home'})
        })
}

</script>