<template>
    <div
        class="block bg-white rounded border-solid border border-gray-200"
        :class="{ 'shadow-md': shadow, 'p-4': !no_padding, 'w-full': full_width, 'w-max': !full_width }"
    >
        <slot></slot>
    </div>
</template>

<script setup>
// USAGE --- general white background box
// <UiBox shadow> {{ content }} </UiBox>
import { defineProps } from "vue";

const props = defineProps({
    shadow: {
        type: Boolean,
        default: false,
        required: false,
    },
    full_width: {
        type: Boolean,
        default: false,
        required: false,
    },
    no_padding: {
        type: Boolean,
        default: false,
        required: false,
    },
});
</script>
