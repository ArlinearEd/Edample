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
});
</script>

<template>
    <div
        tabindex="0"
        @keydown.enter="(event) => event.target.click()"
        class="quizCard rounded-lg cursor-pointer min-w-[10rem] w-40 h-fit"
        :class="selected"
        :title="title"
    >
        <div
            :style="{ backgroundImage: 'url(' + image + ')' }"
            class="previewImage w-full h-40 rounded-t-lg bg-cover bg-no-repeat bg-center"
        ></div>
        <div class="flex flex-row items-center grow font-bold p-3 bg-white rounded-b-lg">
            <img src="/images/icons/quiz.svg" class="w-4 mr-1.5 unselected" alt="quiz icon" />
            <img src="/images/icons/quiz-selected.svg" class="w-4 mr-1.5 selected" alt="quiz icon" />
            <span class="title grow text-ellipsis overflow-hidden whitespace-nowrap font-normal">{{ title }}</span>
        </div>
    </div>
</template>

<style scoped>
.quizCard {
    border: 2px solid #eeeeee;
}
.quizCard:focus {
    border-color: #5288ec;
    color: #2b4f86;
}

.quizCard:not(:focus) .selected,
.quizCard:focus .unselected {
    display: none;
}
.quizCard:focus .selected {
    display: block;
}
.quizCard:focus .title {
    font-weight: bold;
}
</style>
