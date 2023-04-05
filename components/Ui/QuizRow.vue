<template>
    <tr class="row hover:bg-stone-50 cursor-pointer" tabindex="0">
        <!-- quiz icon -->
        <td
            align="center"
            class="w-[5rem] cursor-grab"
        >
            <img src="/images/icons/quiz.svg" class="w-5 unselected" alt="quiz" draggable="false" />
        </td>

        <!-- title -->
        <td  nowrap="nowrap">
            <span class="inline-block w-full bg-transparent">{{quiz.title}}</span>
        </td>

        <!-- submitted -->
        <td align="center" class="opacity-75 font-bold text-lg w-40">
            {{ quiz.submitted }}
        </td>

        <!-- avg grade -->
        <td align="center" class="opacity-75 font-bold text-lg w-40">
            {{ quiz.avg_grade }}
        </td>

        <!-- quiz status -->
        <td align="center" class="w-40">
            <UiStatusLabel color="green">Completed</UiStatusLabel>
        </td>
        <td>
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
