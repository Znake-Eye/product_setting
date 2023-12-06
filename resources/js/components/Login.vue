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
                <input v-model="user.name" @keydown.enter="login" class="p-1 border-gray-400 outline-none" type="text" placeholder="Email or phone number"/>
                <input v-model="user.password" @keydown.enter="login" class="p-1 border-gray-400 outline-none" type="password" placeholder="password" />
                <button @click="login()" type="button" class="border-none w-full bg-blue-500 text-white">Log In</button>
                <p class="w-full text-blue-500 text-center font-semibold">Haven't any account?</p>
                <button type="button" class="border-none w-full bg-green-500 text-center text-white">Create New Account</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {ref, onMounted, reactive} from "vue"
    import {useRouter} from "vue-router"

    const router = useRouter()

    const myUser  = [
                        { name : 'Manh Vichhai', email : 'vichhaireal2020@gmail.com', password : '20052003', role : 'Admin'},
                        { name : 'Znake Eye',    email : 'znakeeye@gmail.com',        password : '0000',     role : 'user'}
                    ]

    const user = reactive({
        name : '',
        password : ''
    })

    const login = () => {
        myUser.forEach(el => {
             if(user.name == el.name || user.name == el.email){
                if(user.password == el.password){
                // localStorage.setItem('user', JSON.stringify(myUser))
                    sessionStorage.setItem('user', JSON.stringify(el))
                    if(el.role =='Admin'){
                        router.push({name : 'Home'})
                    }
                    else if(el.role == 'user'){
                        router.push({name : 'About'})
                    }
                    
                }
                else{
                    alert("please check your password again")
                }
            }
        })

       
       // router.push({name : 'Home'})
    }
</script>