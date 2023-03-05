<script setup>
import { defineProps } from "vue";
const props = defineProps({
    editable: {
        type: Boolean,
        default: false,
        required: false,
    },
    title: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        default: "/images/quiz-default.jpg",
        required: false,
    },
    quiz: {
        type: Object,
        required: true,
    }
});
</script>

<template>
    <div
        tabindex="0"
        @keydown.enter="(event) => event.target.click()"
        class="quizCard border-2 border-gray-200 rounded-lg cursor-pointer min-w-[10rem] w-40 h-fit"
        :title="title"
        @click="navigateTo('/take-quiz/' + quiz.api_key)"
    >
        <div
            :style="{ backgroundImage: 'url(/images/icons/quiz.svg)' }"
            class="previewImage w-full h-40 rounded-t-lg bg-gray-100 bg-[length:100px_70px] bg-no-repeat bg-center opacity-40"
        ></div>
        <div class="flex flex-row items-center grow font-bold p-3 bg-white rounded-b-lg">
            <!-- <img src="/images/icons/quiz.svg" class="w-4 mr-1.5 unselected" alt="quiz icon" />
            <img src="/images/icons/quiz-selected.svg" class="w-4 mr-1.5 selected" alt="quiz icon" /> -->
            <span class="title grow text-ellipsis overflow-hidden whitespace-nowrap font-normal text-gray-700">{{ title }}</span>
        </div>
    </div>
</template>

<style scoped>
.quizCard:focus {
    border-color: #5288ec;
}

</style>
