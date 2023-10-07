<template>
    <Navigation/>
    <h1>Home page</h1>
    <h2>Date : {{ date }}</h2>
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
    const items = reactive([
        {id: 1, name : 'Apple', qty : 1, price : 1000},
        {id: 2, name : 'Orange', qty : 1, price : 1000},
        {id: 3, name : 'Mango', qty : 1, price : 500},
        {id: 4, name : 'Coconut', qty : 1, price : 3000},
        {id: 5, name : 'Juice', qty : 1, price : 2000}
    ]) 
    const searchItems = reactive([])

    //function
    const Increment = (item) => {
        item.qty += 1
    }
    const Decrement = (item) => {
        item.qty > 0 ? item.qty -=1 : item.qty = 0 
    }

    const searchItem = () => {
        // console.log(search.value)
        if(search.value != ''){
            items.filter(item => {
                let isTrue = ((item.name).toLowerCase()).includes(search.value)
                if(isTrue) items.push(item)
            })
        }else{
            searchItems.values = []
        }
        
        
        console.log(items)
    }

    
    //hook onMounted
    onMounted(() => {
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

    
    
    //watch property
    // watch(() => )

</script>