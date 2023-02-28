<script setup>
// USAGE --- button with different colors
// ***add link and/or action emitter

import { defineProps } from "vue";
const props = defineProps({
    rounded: {
        type: Boolean, // makes button fully rounded
        default: false,
        required: false,
    },
    shadow: {
        type: Boolean, // makes button fully rounded
        default: false,
        required: false,
    },
    loading: {
        type: Boolean, // adds loading icon
        default: false,
        required: false,
    },
    color: {
        type: String, // colors: green, blue, red, white
        default: "black",
        required: false,
    },
    icon: {
        type: String, // icons in assets/images/icons (default is dark (add "-light" for white version))
        required: false,
    },
    icon_position: {
        type: String,
        default: "left", // left (default), right
        required: false,
    },
});
</script>

<template>
    <button
        class="inline-flex flex-row items-center py-1.5 px-3.5 cursor-pointer font-bold"
        :class="[
            color,
            rounded ? ' rounded-full border-solid border border-gray-200' : ' rounded',
            shadow ? 'shadow-sm' : '',
            loading ? 'disabled' : '',
        ]"
        :disabled="loading"
    >
        <img v-if="icon && !loading" :src="'/images/icons/' + icon" class="icon" :class="[icon_position]" />
        <img
            v-show="loading"
            class="w-4 mr-1 scale-150"
            :src="'/images/icons/loading_spinner' + (color == 'white' || color == 'black' ? '' : '_white') + '.svg'"
            alt="Loading..."
        />
        <slot></slot>
    </button>
</template>

<style scoped lang="scss">
button {
    transition: background-color 0.1s ease;
}

/* button background colors */
.green {
    color: #ffffff;
    background-color: #4db857;
    &:hover {
        background-color: #379440;
    }
}
.blue {
    color: #ffffff;
    background-color: #5288ec;
    &:hover {
        background-color: #4373cc;
    }
}
.red {
    color: #ffffff;
    background-color: #f44545;
    &:hover {
        background-color: #d33a3a;
    }
}
.white {
    background-color: #ffffff;
    // filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
    &:hover {
        background-color: #fafafa;
    }
}

/* icon 
nuxt-img ref https://image.nuxtjs.org/components/nuxt-img 
*/
.icon {
    width: 1.3em;
}
.icon.right {
    order: 1;
    margin-left: 0.5em;
}
.icon.left {
    margin-right: 0.5em;
}
</style>
