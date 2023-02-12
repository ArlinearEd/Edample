<template>
    Available Quizzes:
    <div v-for="quiz in folder.quizzes" :key="quiz">
        <button @click="navigateTo('/take-quiz/' + quiz.api_key)">{{ quiz.title }}</button>
    </div>
</template>

<script setup>

const route = useRoute();
const folderKey = route.params.id;

const folders = useCookie("folders");

// find element of folders with api_key = folderKey
const folder = folders.value.find(folder => folder.api_key === folderKey);

</script>