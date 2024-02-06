<template>
    <Navigation/>
    <h1>This is about page</h1>
    <h1>Date : {{ date }}</h1>
    <h3>count : {{ count }}</h3>
    <button @click="increment">Increment</button>
    <h2>Total : {{ Total }}</h2>
    <center>
        <h1>Students table</h1>
        <input type="search" v-model="search" />
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Sex</th>
                    <th>Age</th>
                    <th>Major</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, id) in peopleList" :key="id">
                    <td>{{ id + 1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.sex }}</td>
                    <td>{{ item.age }}</td>
                    <td>{{ item.major }}</td>
                </tr>
            </tbody>
        </table>
    </center>
    

</template>

<script setup>
    import {ref,onMounted, computed, reactive} from  "vue"
    import {useRouter} from "vue-router"
    import Auth from "../Auth";

    const route = useRouter()
    const date = new Date()
    const count = ref(0)
    const search = ref('')
    var data = reactive([
        {
            name : 'Manh Vichhai',
            age : 21,
            sex : 'Male',
            major : 'Computer Science'
        },
        {
            name : 'Choun Sokhom',
            age : 21,
            sex : 'Male',
            major : 'Computer Science'
        },
        {
            name : 'Nut Kimsrun',
            age : 21,
            sex : 'Male',
            major : 'Computer Science'
        },
        {
            name : 'Neak Vary',
            age : 21,
            sex : 'Male',
            major : 'Engineer'
        },
    ])
    const increment = () => {
        count.value += 1
        route.push({name : 'About', query:{id:count.value}})
    }

    onMounted(() => {
        console.log("Mounted component")
        console.log(data)
        console.log(Auth.User)
        
    })

    const Total = computed(() => {
        let total = 30
        console.log("this is computed property")
        return  count.value + total
    })

    const peopleList = computed(() => {
        return data.filter((el) => (el.name.toLocaleLowerCase()).includes((search.value).toLocaleLowerCase()))
    })
   

</script>