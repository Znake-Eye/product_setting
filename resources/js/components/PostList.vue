<template>
    <center>
        <h1>This is postlist component</h1>
        <div v-for="post in posts">
            <h1>{{ post.title }}</h1>
            <p>{{ snippet(post.description) }}</p>
            <router-link :to="{name : 'DetailPost', params : {id : post.id}}">view detial</router-link>
            <!-- <button @click="viewDetail(post.id)">view Datail</button> -->
            <hr/>
        </div>

    </center>
    
</template>

<script >
import {computed} from  "vue"
import {useRouter} from "vue-router"

export default{
    props : ['posts'],
    setup(props){
        console.log(props.posts)

        const route = useRouter()

        const snippet = (text) => {
            if(text.length != null){
                return   text.length > 50 ?  text.substring(0,50) + '....' :  text
            }
            else{
                return text
            }
        }
        // const viewDetail = (id) => {
        //     route.push({name : 'DetailPost', query: {id : id}})
        // }
        

        return {snippet}

    }
}

</script>