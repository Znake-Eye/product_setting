<template>
    <div class="bg-slate-100 h-screen flex">
        <div class="w-1/2 h-screen flex flex-col justify-center items-center">
            <div class="w-3/5 mb-40">
                <h1 class="text-5xl mb-2 text-blue-500 font-bold">Facebook</h1>
                <p class="text-2xl font-semibold">Connect with your friends and the world around you on Facebook.</p>
            </div>
        </div>
        <div class="w-1/2  h-screen flex flex-col justify-center ml-8">
            <div class="box-login h-fit flex flex-col gap-4 w-1/3">
                <input v-model="user.email" @keydown.enter="login" class="p-1 border-gray-400 outline-none" type="text" placeholder="Email or phone number"/>
                <input v-model="user.password" @keydown.enter="login" class="p-1 border-gray-400 outline-none" type="password" placeholder="password" />
                <button @click="login()" type="button" class="border-none w-full bg-blue-500 text-white">Log In</button>
                <p class="w-full text-blue-500 text-center font-semibold">Haven't any account?</p>
                <!-- <div>
                    <button @click="" type="button" class="border-none w-full bg-blue-500 text-white">Login with Google</button>
                </div> -->

                <button @click="loginGoogle">Login Using Google</button>
                
                <button @click="register()" type="button" class="border-none w-full bg-green-500 text-center text-white">Create New Account</button>
            </div>
        </div>
    </div>

</template>

<script setup>
    import {ref, onMounted, reactive} from "vue"
    import {useRouter} from "vue-router"
    import axios from "axios";
    import Auth from "../Auth";
    import { googleAuthCodeLogin,googleTokenLogin } from "vue3-google-login"

    const router = useRouter()

    const user = reactive({
        email : '',
        password : ''
    
    })

    const loginGoogle = () => {
        googleTokenLogin().then((response) => {
            console.log("Handle the response", response)
           getUserData(response.access_token)
          
            
        })
    }

    const getUserData = async (accessToken) => {
      // Make a request to the Google API to get user data
      const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`);
      const userData = await response.json();
      console.log('user data')
      console.log(userData)
      userData.role = 'user'
      Auth.login(accessToken,userData)
      router.push({name : 'Home'})
    
    };
    
    const register = () => {
        router.push({name : 'Register'})
    }
    const callback = (response) => {
        console.log("Handle the response", response)
    }

    const login = () => {
        axios.post('api/login', user)
            .then(res => {
                if(res.data.status){
                    Auth.login(res.data.access_token,res.data.user)
                    if(Auth.User.role == 'admin'){
                        router.push({name : 'Home'})
                    }else{
                        router.push({name : 'About'})
                    }
                    
                }
                else{
                    let message = res.data.message+". Please check email and password again"
                    alert(message)
                }
            })
    }
</script>