<template>
    <div v-for="quiz in quizzes" :key="quiz">
        {{ quiz }}
        <button> view grades</button>
    </div>

    <br />

    <input type="text" v-model="quizKey" />
    <button @click="addQuiz">+ Add Quiz</button>

    <br />

    <NuxtLink to="/">Home</NuxtLink>
</template>

<script setup>
const quizKey = ref("");

const quizzes = useCookie("quizzes");

if (!quizzes.value) {
    quizzes.value = [];
}

// const quizzes = ref([])

const addQuiz = () => {
    quizzes.value.push(quizKey.value);
    quizKey.value = "";
};
</script>
