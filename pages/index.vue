<template>
<div>

    <UiHeader />

    <div class="max-w-md">
        <div class="bg-cover bg-no-repeat bg-center">
            <h1 class="text-xl mb-2">My Classroom</h1>
            <p class="text-sm color-gray-800">**Add demo description**</p>
        </div>

        <UiBox shadow>
            <div class="flex items-center">
                <h4>Available Quizzes</h4>

                <div class="flex gap-3 ml-auto">
                    <Button color="green">+ Import Folder</Button>
                    <Button color="green">+ Add Quiz</Button>
                </div>
            </div>

            <!-- toggle folder -->
            <div class="flex items-end mt-4 mb-3">
                <div class="p-3 border-blue-500 border-b-[2px]">All</div>
                <div class="p-3 border-gray-500 border-b-[2px]">Science</div>
                <div class="p-3 border-gray-500 border-b-[2px]">Math</div>
                <div class="p-3 grow border-gray-500 border-b-[2px]"></div>
            </div>

            <!-- show quizzes in selected folder -->
            <div class="flex flex-wrap">
                <UiQuizCard title="Quiz 1" />
                <UiQuizCard title="Quiz 2" />
                <UiQuizCard title="Quiz 3" />
            </div>
        </UiBox>

        <UiBox shadow>
            <div class="flex flex-col">
                <h4 class="pb-1 border-gray-500 border-b-[2px]">Completed Quizzes</h4>
                
                <!-- table of completed quizzes -->
                <!-- on click, open modal and show completed quiz grades -->
                <UiTable
                        v-if="!loading"
                        :columns="tableColumns"
                        :alignment="['center', 'left', 'center', 'center', 'center']"
                        v-model:sort="tableSort"
                        class="w-full my-4"
                    >
                        <UiQuizRow
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

</script>
