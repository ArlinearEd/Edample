<template>
    Available Subjects:
    <div v-for="folder in folders" :key="folder">
        <button @click='navigateTo("/folder/" + folder.api_key)'>{{ folder.name }}</button>
    </div>
    <NuxtLink to="/">Home</NuxtLink>

</template>

<script setup>
const folders = useCookie("folders");
</script>
