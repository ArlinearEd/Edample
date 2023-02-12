<template>
    Available quizzes:
    <div v-for="quiz in quizzes" :key="quiz">
        <button @click="navigateTo('/take-quiz/' + quiz)">{{ quiz }}</button>
    </div>
    <NuxtLink to="/">Home</NuxtLink>

</template>

<script setup>
const quizzes = useCookie("quizzes");
</script>
