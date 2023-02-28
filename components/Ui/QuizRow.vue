<template>
    <tr class="row hover:bg-stone-50 focus:bg-stone-50 cursor-pointer" tabindex="0" data-cy="quiz">
        <!-- quiz icon -->
        <td
            align="center"
            class="w-[5rem] cursor-grab"
        >
            <img src="/images/icons/quiz.svg" class="w-5 unselected" alt="quiz" draggable="false" />
            <img src="/images/icons/quiz-selected.svg" class="w-5 selected" alt="quiz" draggable="false" />
        </td>

        <!-- title -->
        <td>
            <span class="inline-block w-full bg-transparent">{{quiz.title}}</span>
        </td>

        <!-- avg grade -->
        <td align="center" class="opacity-75 font-bold text-lg w-40">
            {{ quiz.avg_grade }}
        </td>

        <!-- quiz status -->
        <td align="center" class="w-40">
            <UiStatusLabel color="green">Completed</UiStatusLabel>
        </td>

    </tr>
</template>

<script setup lang="ts">
const props = defineProps({
    quiz: {
        type: Object,
        required: true,
    },
});
</script>

<style>
.row:focus {
    color: #2b4f86;
}
.row:focus-visible {
    outline: solid 2px #5288ec;
}
.row:not(:focus) .selected,
.row:focus .unselected {
    display: none;
}
.row:focus .selected {
    display: block;
}
.row:focus .title {
    font-weight: bold;
}
</style>
