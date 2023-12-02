<template>
    <Navigation/>
    <h1>this is detail post</h1>
    <p>this is my local change</p>
    <p>change from my local</p>
    <ul>
        <li v-for="item in Post">
            {{ item.description }}
        </li>
    </ul>
</template>

<script setup>
import { ref, onMounted , computed} from 'vue';
import { useRoute } from 'vue-router';
//call useRoute
const route = useRoute()
//get id from params route
const id = route.params.id
//mount when page load
onMounted(() => {
    console.log("the id is ")
    console.log(id)
})

//object of posts
const posts = ref([
                {id: 1, description : "Hello world this is javascript programming language this is javascript programming language this is javascript programming language",title: 'Javacript'},
                {id: 2, description: "java is one of my favourite programming language favourite programming language", title : 'Java'}
            ])

//filter to get one object
const Post = computed(() => {
   return posts.value.filter(el => el.id == id)
})



</script>
