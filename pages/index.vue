<template>
    <div>
        <UiModal v-model:modalActive="modalActive">
            <!-- Import Quiz/Folder  -->
            <ImportQuizFolder
                v-if="modalContent == 'import'"
                @addedFolder="folders.push($event)"
                @addQuiz="availableQuizzes.push({ title: 'TODO: quiz name', api_key: $event })"
                @closeModal="modalActive = false"
            />

            <!-- View Grades -->
            <ViewGrades v-else-if="modalContent == 'grades'" :quiz="selectedQuiz" />
        </UiModal>

        <UiHeader />

        <div class="w-full max-w-[1000px] mx-auto flex flex-col gap-6 items-stretch">
            <div class="px-4 pt-24 pb-4 classroom-background bg-cover bg-no-repeat bg-center text-white">
                <h1 class="text-2xl font-bold mb-2">My Demo Classroom</h1>
                <p class="text-sm">
                    Welcome teachers! We've set up a demo classroom to give you a taste of how Arlinear's quizzing and
                    grading system can simplify your LMS platform.
                </p>
            </div>

            <UiBox shadow full_width>
                <div class="flex items-center">
                    <h4 class="text-xl">Available Quizzes</h4>

                    <div class="flex gap-3 ml-auto">
                        <UiButton color="green" @click="openModal('import')">+ Import</UiButton>
                    </div>
                </div>

                <!-- toggle folder -->
                <div v-if="availableQuizzes.length" class="flex items-end mt-1 mb-3">
                    <div
                        v-for="(folder, idx) in [{ name: 'All' }].concat(folders)"
                        :key="folder"
                        @click="selectedTab = idx"
                        :class="[idx == selectedTab ? 'border-blue-500 font-bold' : 'border-gray-300']"
                        class="p-3 border-b-[2px] cursor-pointer"
                    >
                        {{ folder.name }}
                    </div>

                    <div class="p-3 border-b-[2px] grow border-gray-300"></div>
                </div>

                <!-- show quizzes in selected folder -->
                <div v-if="availableQuizzes.length" class="flex flex-wrap gap-2">
                    <!-- TODO @malek: show quizzes based on what tab youre in (show quizzes without folder first) -->
                    <UiQuizCard v-for="quiz in quizzesInTab" :key="quiz.id" :title="quiz.title" :quiz="quiz" />
                </div>
                <p v-else class="text-md text-gray-500 text-center mx-auto my-12">
                    Add some quizzes to build your classroom. <br />
                    <br />
                    You can... <br />
                    1. Add a single quiz <br />
                    2. Import multiple quizzes from a folder in
                    <a class="text-blue-600 underline" href="/library" target="_blank">your Library</a>
                </p>
            </UiBox>

            <UiBox shadow full_width>
                <div class="flex flex-col">
                    <h4 class="text-xl pb-2.5 border-gray-300 border-b-[2px]">Completed Quizzes</h4>

                    <!-- table of completed quizzes -->
                    <!-- on click, open modal and show completed quiz grades -->
                    <UiTable
                        v-if="!loading"
                        :columns="tableColumns"
                        :alignment="['center', 'left', 'center', 'center', 'center']"
                        class="w-full"
                    >
                        <UiQuizRow
                            @click="openModal('grades', quiz)"
                            v-for="quiz in completedQuizzes"
                            :quiz="quiz"
                            :key="quiz.id"
                        />
                    </UiTable>
                </div>
            </UiBox>
        </div>
    </div>
</template>

<script setup>
import { fetchQuizzesFromFolder } from "@arlinear/quiz";

const folders = useCookie("folders");
const selectedTab = ref(0);

if (!folders.value) {
    folders.value = [];
}

// update folder content on page refresh
for (let i = 0; i < folders.value.length; i++) {
    folders.value[i] = await fetchQuizzesFromFolder(folders.value[i].api_key);
}

// available quizzes tabs
const availableQuizzes = useCookie("quizzes");

if (!availableQuizzes.value) {
    availableQuizzes.value = [];
}

const quizzesInTab = computed(() => {
    // if all tab is selected, show all quizzes (+ show quizzes without folder first)
    if (selectedTab.value == 0) {
        return availableQuizzes.value.filter((a) => a.folder == null);
    }

    return folders.value[selectedTab.value - 1].quizzes;
});

// completed quiz table
const tableColumns = ref([
    { label: "", value: "type" },
    { label: "Name", value: "title" },
    { label: "Total Submissions", value: "submitted" },
    { label: "AVG Grade", value: "avg_grade" },
    { label: "Status", value: "status" },
    { label: "", value: "" },
]);
const completedQuizzes = ref([
    {
        title: "Week 1 Quiz",
        avg_grade: "79%",
        submitted: "12/13",
        status: "Completed",
    },
    {
        title: "Week 2 Quiz",
        submitted: "11/13",
        avg_grade: "83%",
        status: "Completed",
    },
]);

// modal (for quiz/folder crud && completed quiz grades)
const modalActive = ref(false);
// modalContent == "import" || "grades"
const modalContent = ref("import");

const selectedQuiz = ref(null);

const openModal = (content, quiz) => {
    if (quiz) selectedQuiz.value = quiz;

    modalContent.value = content;
    modalActive.value = true;
};
</script>

<style scoped>
.classroom-background {
    background-image: url("/images/classroom-image.jpg");
}
</style>
