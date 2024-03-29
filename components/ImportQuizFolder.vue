<template>
    <h2 class="text-xl text-center font-bold">Import Quiz or Folder</h2>

    <!-- search bar and button -->
    <div class="flex items-center justify-center my-4">
        <input
            v-model.trim="quizFolderKey"
            placeholder="Get Quiz/Folder by Key"
            class="input-border cursor-text w-full max-w-[20rem]"
            @keydown.enter="getQuizzes()"
            @input="searchedQuizzes = null"
        />
        <UiButton 
            @click="getQuizzes()"
            class="py-[6.5px] px-6"
            :loading="loading"
            color="blue">
            {{ loading ? 'Searching...' : '+ Get Quiz' }}
        </UiButton>
    </div>

    <div class="flex flex-col justify-center mt-6 mb-4">

        <!-- instructions on how to import quiz/key -->
        <p v-if="!searchedQuizzes && !loading"
            class="text-center text-gray-800">
            <h6 class="font-bold mb-2">How to import a quiz:</h6>
            <ol class="list-decimal list-inside">
                <li>Go to <a class="text-blue-600 underline" href="https://app.arlinear.com/library" target="_blank">your Library</a></li>
                <li>Click on the Quiz or Folder you'd like to import.</li>
                <li>Click the blue "Share" button.</li>
                <li>Set the quiz sharing from "No one" to "Anyone" & copy the quiz key.</li>
                <li>Paste the key in the search bar</li>
                <li>Click the "Get Quiz" button</li>
            </ol>
        </p>

        <!-- loading quizzes -->
        <div v-if="loading" 
            class="flex justify-center gap-2">

            <div v-for="i in 3" :key="i" 
                class="bg-gray-100 rounded-lg min-w-[10rem] w-40 h-fit">
                <div
                    class="w-full h-40 rounded-t-lg bg-gray-300 animate-pulse"
                ></div>
                <div class="flex flex-row items-center gap-3 grow py-4 px-3 rounded-b-lg">
                    <div class="h-4 w-4 rounded bg-gray-300 animate-pulse"></div>
                    <span class="h-4 rounded w-full bg-gray-300 animate-pulse"></span>
                </div>
            </div>
        </div>
        
        <!-- quiz results -->
        <div v-if="searchedQuizzes && !loading" 
            class="flex flex-col justify-center">

            <div class="flex justify-center items-center gap-2">
                <UiQuizCard v-for="quiz in searchedQuizzes.slice(0,4)" :key="quiz.api_key" 
                    :title="quiz.title" />
                    <p v-if="searchedQuizzes.length > 4"
                        class='text-sm text-gray-800'>& {{searchedQuizzes.length - 4}} more</p>
            </div>
            <div class="flex justify-center gap-2 mt-6">
                <UiButton 
                    @click="addQuizzesToClassroom()"
                    icon="success-white.svg"
                    color="green">
                    Add Quizzes to Classroom
                </UiButton>
            </div>
        </div>
        
    </div>
</template>

<script setup>


const loading = ref(false);

const quizFolderKey = ref('');
const searchedQuizzes = ref(null);

const selectedFolder = ref(null);

/**
 * Users inputs either a quiz key or a folder key.
 * If its a folder key, it will fetch all the quizzes in the folder, and display them.
 */
const getQuizzes = async () => {
    loading.value = true;
    const metaData = await getQuizMetadata(quizFolderKey.value);
    const folderResponse = await fetchQuizzesFromFolder(quizFolderKey.value);
    loading.value = false;

    if(metaData.status === 200) {
        const body = await metaData.json();

        //response is just a quiz, add it.
        emit('addQuiz', {api_key: quizFolderKey.value, title: body.title});
        return;
    }

    if(folderResponse.status === 200) {
        const body = await folderResponse.json();
        searchedQuizzes.value = body.quizzes;
        selectedFolder.value = body;
        return;
    }
}

const getQuizMetadata = async (quizKey) => {
    return await fetch('https://vtufvyfrupbmqthveiyy.functions.supabase.co/get-quiz-metadata', {
        method: 'POST',
        body: JSON.stringify({
            quizKey,
        })
    })
}

const  fetchQuizzesFromFolder = async (folderKey) => {
    return await fetch('https://vtufvyfrupbmqthveiyy.functions.supabase.co/fetch-folder', {
        method: 'POST',
        body: JSON.stringify({
             folderKey,
        })
    })
}

const emit = defineEmits(['addedFolder', "closeModal", 'addQuiz']);
const addQuizzesToClassroom = () => {
    if(typeof selectedFolder.value == typeof []) {
        emit ('addedFolder', selectedFolder.value);
    }
    alert("Quizzes added to classroom")

    selectedFolder.value = null;
    searchedQuizzes.value = null;

    emit('closeModal');
}


</script>

<style scoped>
.input-border{
    min-width: 45px;

    background: #fff;
    padding: 0.4em 0.65em;

    line-height: 1.25rem;
    font-weight: normal;
    font-size: .85rem;

    border: 2px solid #dbdbdb;
    border-radius: 4px;
    cursor: text !important;
}
.input-border:focus{
    outline: none !important;
}
.input-border:focus-visible{
    border-color: #49a2f4;
    outline: 0 !important;
}
.input-border::placeholder{
    font-weight: normal;
}
</style>