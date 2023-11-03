<template>
    <Navigation />
    <h1>Post page in vue component</h1>
    <PostList :posts="posts"/>
    <!-- <ul>
        <li v-for="item in posts">{{ item.title }}</li>
    </ul> -->
</template>

<script>

    import {ref} from "vue"
    import PostList from "./PostList.vue"
    export default{
        components: {PostList},
        setup(){
            const posts = ref([
                {id: 1, description : "Hello world this is javascript programming language this is javascript programming language this is javascript programming language",title: 'Javacript'},
                {id: 2, description: "java is one of my favourite programming language favourite programming language", title : 'Java'}
            ])
            
            return {
                posts
            }
        }
    }

</script>