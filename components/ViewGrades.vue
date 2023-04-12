<template>
<div class="flex flex-col justify-center">
    <h2 class="text-xl text-center font-bold">Grades for {{quiz.title}}</h2>
    <UiButton @click="downloadGrades(submissions)" class="mt-3 mx-auto" color="green">Download Grades as CSV</UiButton>
    <UiTable
            v-if="!loading"
            :columns="tableColumns"
            :alignment="['left', 'center', 'center', 'center']"
            class="w-full mt-6"
        >

            <!-- v-for="submission in quiz.grades" -->
            <tr v-for="submission, i in submissions" :key="i"
                class="border-t border-gray-100 hover:bg-stone-50" tabindex="0">

                <!-- student name -->
                <td align="left" nowrap="nowrap">
                    <span class="inline-block w-full bg-transparent">{{submission.student}}</span>
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
</div>
</template>

<script setup>
const props = defineProps({
    quiz: {
        type: Boolean,
        default: false,
    },
    submissions: {
        type: Array,
    }
});


const tableColumns = ref([
    { label: "Name", value: "name" },
    { label: "Score", value: "grade" },
    { label: "Grade", value: "percentage" },
    { label: "", value: "" },
]);



const downloadGrades = (grades) => {
    //convert grades.value to csv and download
    let csv = "Student,Score,Grade\n";
    grades.forEach((row) => {
        csv += row.student + "," + row.score + "," + row.grade + "\n";
    });

    let hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";
    hiddenElement.download = "grades.csv";
    hiddenElement.click();
}
</script>
