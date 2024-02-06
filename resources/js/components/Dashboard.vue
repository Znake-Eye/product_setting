<template>
    <h1>This is dashboard page vue component</h1>
    <h1>Hello {{ myName }}</h1>
    <h1>My age {{ myAge.age }}</h1>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, reactive, computed } from 'vue';
const myName = ref('Manh Vichhai')
const myAge = reactive({age : 20})
myName.value = "neak vary"
myAge.age = 30
</script>