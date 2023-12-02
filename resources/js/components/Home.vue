<template>
    <Navigation/>
    <h1>Home page</h1>
    <h2>Date : {{ date }}</h2>
    <center>
        <input type="text" v-model="form.id" placeholder="id"/>
        <input type="text" v-model="form.name" placeholder="name" />
        <input type="text" v-model="form.qty" placeholder="qty" />
        <input type="text" v-model="form.price" placeholder="price" />
        <button @click="addNew()">Insert</button>
    </center>
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
    import {ref, reactive, computed, onMounted, watch} from "vue"

    //decleration
    const date = ref('')
    const search = ref('')
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
    
    //hook onMounted
    onMounted(() => {
        date.value = new Date().toLocaleTimeString()
        setInterval(()=> {
            date.value = new Date().toLocaleTimeString()
        }, 1000)

        const user = JSON.parse(sessionStorage.getItem('user'))
        console.log('data of session storage is ')
        console.log(user)

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

    

</script>