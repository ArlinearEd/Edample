<script setup>
// USAGE --- to display status & single grade values

import { defineProps } from "vue";
const props = defineProps({
    color: {
        type: String, // gray, blue, green, yellow, red
        default: "gray",
        required: false,
    },
    classes: {
        type: String,
        required: false,
    },
});
</script>

<template>
    <div class="status_label inline-block w-fit rounded" :class="[color, classes ? classes : ' py-1.5 px-2.5']">
        <slot />
    </div>
</template>

<style scoped>
.status_label {
    color: #686868;
    background: #f5f5f5;
}

.status_label.blue {
    color: #38778b;
    background: #d5e9f4;
}
.status_label.green {
    color: #388b41;
    background: #d5f4d8;
}
.status_label.yellow {
    color: #797631;
    background: #f4f3d5;
}
.status_label.red {
    color: #793131;
    background: #f9e9e9;
}
</style>
