<template>
    <Navigation/>
    <h1>Home page</h1>
    <input type="file" ref="fileInput" id="file" @change="handleFile()"/>

    <button @click="submit()">Submit</button>

    <a href="uploads/1701526731_CV.pdf">View my CV</a>

    <video controls>
        <source src="uploads/1701526904_fresh.mp4" />
    </video>
    
    <center>
        <h2>List items</h2>
        <input placeholder="search" type="search" v-model="search" @input="searchItem()"/>
        <table>
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Action</th>
            </tr>
            <tr v-for="(item, index) in items" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.qty }}</td>
                <td>
                    <button @click="Decrement(item)">-</button>
                    <button @click="Increment(item)">+</button>
                </td>
            </tr>
            <tr>
                <th>Total amount</th>
                <td colspan="4">{{ total }}</td>
            </tr>
        </table>
    </center>

</template>
<script setup>
    import {ref, reactive, computed, onMounted, watch,onBeforeMount} from "vue"
    import axios from "axios"
    import { useRouter } from "vue-router";
    import Auth from "../Auth";

    //decleration
    const date = ref('')
    const search = ref('')
    const myForm = ref({name : '', file : null})

    var User = reactive([])
    
    //route
    const Route = useRouter()


    const form = ref({
        id : null,name : null,qty : 0, price : 0
    })
    var items = reactive([
        {id: 1, name : 'Apple', qty : 1, price : 1000},
        {id: 2, name : 'Orange', qty : 1, price : 1000},
        {id: 3, name : 'Mango', qty : 1, price : 500},
        {id: 4, name : 'Coconut', qty : 1, price : 3000},
        {id: 5, name : 'Juice', qty : 1, price : 2000}
    ]) 
    const searchItems = reactive([])

    const getUser =async () => {
        try {
            // console.log('token')
            // console.log(Auth.Token)
             axios.get('api/getUser', {headers :{"Authorization" : Auth.Token}})
                .then(res => {
                    User = res.data
                    console.log('user')
                    console.log(User)
                })
        } catch (error) {
            
        }
        
            
    }

    const addNew = () => {
        console.log(form.value)
     //   items.push(form.value)
        console.log(items)
        var helper = form.value

        items = [...items, helper]
        console.log(items)
        form.id = null
        form.name = null
        form.qty = 0
        form.price = 0
        
    }

    //function
    const Increment = (item) => {
        item.qty = parseInt(item.qty) + 1
    }
    const Decrement = (item) => {
        item.qty > 0 ? item.qty -=1 : item.qty = 0 
    }
    //on before mounted
    onBeforeMount(() => {
       
    })
    
    //hook onMounted
    onMounted(() => {

        console.log(Auth.User)
        getUser()
       

        date.value = new Date().toLocaleTimeString()
        setInterval(()=> {
            date.value = new Date().toLocaleTimeString()
        }, 1000)

        

    })

    //computed property
    const total = computed(() => {
        let total_amount = 0
        items.filter(item => {
            total_amount += item.price * item.qty
        })
        if(total_amount > 10000){
            return Number(total_amount).toLocaleString()+" Expensive"
        }
        else if(total_amount === 10000){
            return Number(total_amount).toLocaleString() + " Normal"
        }
        else{
            return Number(total_amount).toLocaleString() + " Cheap"
        }
    })

    //hande file input
    function handleFile(){
        let file = document.getElementById('file').files[0]
        console.log(file)
        myForm.value.file = file
    }
    function submit(){
        myForm.value.name = "Manh Vichhai"
        axios.post('api/uploadfile',myForm.value, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }},)
            .then(res => {
                console.log(res.data)
            })
    }


    

</script>