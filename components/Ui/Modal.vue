<template>
<div :class="{ 'opacity-0 pointer-events-none' : modalActive }"
    class="fixed top-0 left-0 w-screen h-screen z-10 transition">
    <UiBox class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-4xl z-20"
        shadow full_width>
        <div class="pb-2">
            <span @click="$emit('update:modalActive', false)"
                class="cursor-pointer text-gray-700 hover:opacity-80 block w-fit ml-auto text-2xl -translate-2">x</span>
        </div>
        {{ modalActive }}
        <!-- slot content here -->
        <slot />
    </UiBox>
    <div @click="$emit('update:modalActive', false)"
        class="bg-gray-900 opacity-60 top-0 left-0 w-screen h-screen"></div>
</div>
    
</template>

<script setup>

const props = defineProps({
    modalActive: {
        type: Boolean,
        default: false,
    },
});
</script>