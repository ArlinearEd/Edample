<template>
<div>

    <!-- Import Quiz/Folder + View Grades of quiz -->
    <UiModal v-model:modalActive="modalActive">
        <!-- TODO: @malek  -->
        <div v-if="modalContent == 'import' ">
            Import Quiz/Folder
        </div>
        <!-- TODO: @malek  -->
        <div v-else-if="modalContent == 'grades' ">
            View Grades
        </div>
    </UiModal>

    <UiHeader />

    <div class="w-full max-w-[1000px] mx-auto flex flex-col gap-6 items-stretch">
        <div class="px-4 pt-24 pb-4 classroom-background bg-cover bg-no-repeat bg-center text-white">
            <h1 class="text-2xl font-bold mb-2">My Demo Classroom</h1>
            <!-- TODO: @malek write demo description -->
            <p class="text-sm">**Add demo description**</p>
        </div>

        <UiBox shadow full_width>
            <div class="flex items-center">
                <h4 class="text-xl">Available Quizzes</h4>

                <div class="flex gap-3 ml-auto">
                    <!-- TODO @liam: import quiz functionality -->
                    <UiButton color="green" @click="modalActive = true">+ Add Quiz</UiButton>
                    <!-- TODO @liam: import folder functionality -->
                    <UiButton color="green" @click="modalActive = true">+ Import Folder</UiButton>
                </div>
            </div>

            <!-- toggle folder -->
            <div v-if="availableQuizzes.length" 
                class="flex items-end mt-1 mb-3">
                <div v-for="tab in tabs" :key="tab"
                    @click="selectedTab = tab"
                    :class="[ tab == selectedTab ? 'border-blue-500 font-bold' : 'border-gray-300']"
                    class="p-3 border-b-[2px] cursor-pointer">
                    {{tab}}
                </div>
                
                <div class="p-3 border-b-[2px] cursor-pointer grow border-gray-300"></div>
            </div>

            <!-- show quizzes in selected folder -->
            <div v-if="availableQuizzes.length"
                class="flex flex-wrap gap-2">
                <!-- TODO @liam: take quiz @dblclick -->
                <UiQuizCard v-for="quiz in quizzesInTab" :key="quiz.id"
                    title="Click to take quiz" />
            </div>
            <p v-else
                class="text-md text-gray-500 text-center mx-auto my-12">
                Add some quizzes to build your classroom. <br> <br>
                You can... <br>
                1. Add a single quiz <br>
                2. Import multiple quizzes from a folder in <a class="text-blue-600 underline" href="/library" target="_blank">your Arlinear Library</a>
                <!-- <a class="text-blue-600 underline" href="/library" target="_blank">your Arlinear Library</a> -->
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
                        v-model:sort="tableSort"
                        class="w-full"
                    >
                        <UiQuizRow @click="() => {alert('open quiz modal')}"
                            v-for="quiz in completedQuizzes"
                            :quiz="quiz"
                            :key="quiz.id"
                        />
                    </UiTable>
            </div>
        </UiBox>
    </div>

    <!-- <div>
        <NuxtLink to="/teacher">You're a teacher</NuxtLink>
        <br>
        <NuxtLink to="/student">You're a student</NuxtLink>
    </div> -->
</div>
</template>

<script setup>

// available quizzes tabs
const tabs = ref(["All", "Science", "Math"]);
const selectedTab = ref("All");
const availableQuizzes = ref([
    // {
    //     id: 1,
    //     title: "click to take quiz",
    //     folder: null
    // },
]);

const quizzesInTab = computed( () => {

    // if all tab is selected, show all quizzes (+ show quizzes without folder first)
    if(selectedTab.value == "All"){
        return availableQuizzes.value.sort((a, b) => a.folder == null);
    }

    // else, show quizzes in selected folder
    return availableQuizzes.value.filter(quiz => quiz.folder == selectedTab.value);
})


// completed quiz table
const tableColumns = ref([
    { label: "", value: "type" },
    { label: "Name", value: "title" },
    { label: "Total Submissions", value: "submitted" },
    { label: "AVG Grade", value: "avg_grade" },
    { label: "Status", value: "status" },
    { label: "", value: "" },
]);
const sort = ref({ asc: false, col: "Name" });
const completedQuizzes = ref([
    {
        title: "Week 1 Quiz",
        avg_grade: "79%",
        submitted: "12/13",
        status: "Completed",
        grades: [
            { 
                student: "John Smith",
                date_completed: "2023-03-01T10:00:00",
                score: "8/10",
                grade: 80
            },
            { 
                student: "Jane Doe",
                date_completed: "2023-03-01T10:15:00",
                score: "6/10",
                grade: 60
            },
            { 
                student: "Bob Johnson",
                date_completed: "2023-03-01T10:30:00",
                score: "9/10",
                grade: 90
            },
            { 
                student: "Sara Lee",
                date_completed: "2023-03-01T10:45:00",
                score: "5/10",
                grade: 50
            },
            { 
                student: "Tom Green",
                date_completed: "2023-03-01T11:00:00",
                score: "10/10",
                grade: 100
            }
        ]
    },
    {
        title: "Week 2 Quiz",
        submitted: "11/13",
        avg_grade: "83%",
        status: "Completed",
        grades: [
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
        ]
    },
])

// modal (for quiz/folder crud && completed quiz grades)
const modalActive = ref(false);
// modalContent == "import" || "grades"
const modalContent = ref("import");
</script>

<style scoped>
.classroom-background{
    background-image: url('/images/classroom-image.jpg');
    
}
</style>
