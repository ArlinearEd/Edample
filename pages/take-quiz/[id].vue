<template>
    <NuxtLink class="backHomeBtn" to="/">Go Back</NuxtLink>
    
    <ArlinearQuiz :quizKey="quizKey" :primaryKey="yourName" :quizTitle="metaData.body?.title"/>
    <!-- ba777045-7033-4701-b17b-da9e90dcd41e -->

</template>

<script setup>
import { ArlinearQuiz } from "@arlinear/quiz";
import { getQuizMetadata } from "@arlinear/quiz";
import { onMounted } from "vue";

import "@arlinear/quiz/dist/style.css";

const route = useRoute();
const quizKey = route.params.id;
const metaData = ref({});
onMounted(async () => {
    metaData.value = await getQuizMetadata(quizKey);
});

const names = [
    "Malek",
    "Alyssa",
    "Liam",
    "Emma"
]
const yourName = ref(names[Math.floor(Math.random() * names.length)])

</script>

<style scoped>
.backHomeBtn{
    display: block;
    text-align: center;
    font-weight: bold;
    margin: 30px auto;
}
</style>