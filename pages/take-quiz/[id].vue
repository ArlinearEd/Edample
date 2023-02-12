<template>
    bruh
    <ArlinearQuiz :quizKey="id" />
    <!-- ba777045-7033-4701-b17b-da9e90dcd41e -->
    <NuxtLink to="/">Home</NuxtLink>

</template>

<script setup>
import { ArlinearQuiz } from "@arlinear/quiz";
import "@arlinear/quiz/dist/style.css";

const route = useRoute();
const id = route.params.id;
</script>