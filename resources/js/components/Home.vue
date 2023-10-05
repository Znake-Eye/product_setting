<template>
    <!-- <Navigation/> -->
    <h1>Home page</h1>
    <h2>Date : {{ date }}</h2>

</template>
<script setup>
    import {ref, reactive, computed, onMounted} from "vue"

    const date = ref('')
    
    onMounted(() => {
        date.value = new Date().toLocaleTimeString()
        setInterval(()=> {
                date.value = new Date().toLocaleTimeString()
            }, 1000)
    })

   
    


</script>