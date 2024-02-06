<template>
    <h1 style="text-align: center;">404 || Not Found</h1>
    <h1>{{ message }}</h1>
</template>
<script >
    import axios from 'axios';
    import { onMounted, ref, reactive, computed } from 'vue';
    export default{
        setup(){
            const message = "This is not found page for unauthorize User"



            return{
                message
            }
        }
    }


</script>