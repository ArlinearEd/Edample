<template>
    <div>
        <UiModal v-model:modalActive="modalActive">
            <!-- Import Quiz/Folder  -->
            <ImportQuizFolder
                v-if="modalContent == 'import'"
                @addedFolder="
                    ($event) => {
                        folders.push($event);
                        modalActive = false;
                    }
                "
                @addQuiz="
                    ($event) => {
                        availableQuizzes.push($event);
                        modalActive = false;
                    }
                "
                @closeModal="modalActive = false"
            />

            <!-- View Grades -->
            <ViewGrades v-else-if="modalContent == 'grades'" :quiz="selectedQuiz"  :submissions="submissions.filter((s) => s.title === selectedQuiz.title)"/>
        </UiModal>

        <UiHeader />

        <div class="w-full max-w-[1000px] mx-auto flex flex-col gap-6 items-stretch">
            <div class="px-4 pt-24 pb-4 classroom-background bg-cover bg-no-repeat bg-center text-white">
                <h1 class="text-2xl font-bold mb-2">My Demo Classroom</h1>
                <p class="text-sm font-normal">
                    Welcome teachers! We've set up a demo classroom to give you a taste of how Arlinear's quizzing and
                    grading system can simplify your LMS platform. <br>
                    You can view the <a class="font-bold underline" href="https://github.com/ArlinearEd/Edample" target="_blank">Edample source code here</a>.
                </p>
            </div>

            <UiBox shadow full_width>
                <div class="flex items-center">
                    <h4 class="text-xl">Available Quizzes</h4>

                    <div class="flex gap-3 ml-auto">
                        <UiButton color="green" @click="openModal('import')">+ Import Quiz</UiButton>
                    </div>
                </div>

                <!-- toggle folder -->
                <div class="flex items-end mt-1 mb-3">
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
                <div v-if="quizzesInTab.length || availableQuizzes.length" class="flex flex-wrap gap-2">
                    <!-- TODO @malek: show quizzes based on what tab youre in (show quizzes without folder first) -->
                    <UiQuizCard v-for="quiz in quizzesInTab" :key="quiz.id" :title="quiz.title" :quiz="quiz" />
                </div>
                <p v-else class="text-md text-gray-500 text-center mx-auto my-12">
                    Add some quizzes to build your classroom. <br />
                    <br />
                    You can... <br />
                    1. Add a single quiz (Quiz must be share-able to anyone) <br />
                    2. Import multiple quizzes from a folder in
                    <a class="text-blue-600 underline" href="https://app.arlinear.com/library" target="_blank"
                        >your Library</a
                    >
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
    { label: "", value: "" },
]);

const submissions = useCookie("submissions");

if (!submissions.value) {
    submissions.value = [ 
        { "title": "Sample Quiz", "score": "0/10", "grade": 0, "student": "Alyssa" } ,
        { "title": "Sample Quiz", "score": "5/10", "grade": 50, "student": "Malek" },
        { "title": "Sample Quiz", "score": "7/10", "grade": 70, "student": "John" } ,
        { "title": "Sample Quiz", "score": "9/10", "grade": 90, "student": "Liam" } 
    ];
}

//count submissions of same title
const completedQuizzes = submissions.value.reduce((acc, curr) => {
    const index = acc.findIndex((a) => a.title == curr.title);

    if (index == -1) {
        acc.push({
            title: curr.title,
            submitted: 1,
            grades: [curr.grade],
        });
    } else {
        acc[index].submitted++;
        acc[index].grades.push(curr.grade);
    }

    return acc;
}, []);

// for each completed quiz, set avg_grade
completedQuizzes.forEach((quiz) => {
    quiz.avg_grade = quiz.grades.reduce((a, b) => a + b, 0) / quiz.grades.length;
});

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
