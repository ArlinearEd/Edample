<template>
    <div v-for="folder in folders" :key="folder">
        Folder: {{ folder.name }}
        <div v-for="quiz in folder.quizzes" :key="quiz">
            {{ quiz.title }}
            <button> view grades</button>
        </div>
    </div>
    <br />

    <input type="text" v-model="folderKey" />
    <button @click="addFolder">+ Add Folder</button>
    <br />

    <NuxtLink to="/">Home</NuxtLink>
</template>

<script setup>
import { fetchQuizzesFromFolder } from "@arlinear/quiz";

const folderKey = ref("");
const folders = useCookie("folders");

if (!folders.value) {
    folders.value = [];
}

for(let i = 0; i < folders.value.length; i++) {
    folders.value[i] = (await fetchQuizzesFromFolder(folders.value[i].api_key));
}

const addFolder = async () => {
    folders.value.push(await fetchQuizzesFromFolder(folderKey.value));
    folderKey.value = "";
};

</script>
