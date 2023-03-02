<template>
    <h2 class="text-xl text-center font-bold">Grades for {{quiz.title}}</h2>

    <UiTable
            v-if="!loading"
            :columns="tableColumns"
            :alignment="['left', 'center', 'center', 'center']"
            class="w-full mt-6"
        >

            <!-- v-for="submission in quiz.grades" -->
            <tr v-for="submission, i in grades.sort((a, b) => b.grade - a.grade)" :key="i"
                class="border-t border-gray-100 hover:bg-stone-50" tabindex="0">

                <!-- student name -->
                <td align="left" nowrap="nowrap">
                    <span class="inline-block w-full bg-transparent">{{submission.student}}</span>
                </td>

                <!-- date completed -->
                <td align="center" class="opacity-75 w-40">
                    {{prettyQuizDate(submission.date_completed)}} 
                </td>

                <!-- score -->
                <td align="center" class="opacity-75 w-40">
                    <UiStatusLabel>{{submission.score}}</UiStatusLabel>
                </td>

                <!-- grade -->
                <td align="center" class="w-40">
                    <UiStatusLabel>{{submission.grade}}%</UiStatusLabel>
                </td>
                <td></td>

            </tr>
    </UiTable>
</template>

<script setup>
import { useDateFormat } from "@vueuse/core";

const props = defineProps({
    quiz: {
        type: Boolean,
        default: false,
    },
});

const tableColumns = ref([
    { label: "Name", value: "name" },
    { label: "Date Completed", value: "date" },
    { label: "Score", value: "grade" },
    { label: "Grade", value: "percentage" },
    { label: "", value: "" },
]);

const grades = ref([
    { 
        student: "John Smith",
        date_completed: "2023-03-08T09:30:00",
        score: "7/10",
        grade: 70
    },
    { 
        student: "Jane Doe",
        date_completed: "2023-03-08T09:45:00",
        score: "8/10",
        grade: 80
    },
    { 
        student: "Bob Johnson",
        date_completed: "2023-03-08T10:00:00",
        score: "6/10",
        grade: 60
    },
    { 
        student: "Sara Lee",
        date_completed: "2023-03-08T10:15:00",
        score: "9/10",
        grade: 90
    },
    { 
        student: "Tom Green",
        date_completed: "2023-03-08T10:30:00",
        score: "5/10",
        grade: 50
    }
])

const prettyQuizDate = (rawDate) => {
    if (!rawDate) return;
    let formattedDate = useDateFormat(new Date(rawDate), "MMM D, YYYY (h:mm A)");
    return formattedDate.value.replace('"', "");
};
</script>
