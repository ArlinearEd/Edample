<script setup>
import { defineProps } from "vue";
const props = defineProps({
    columns: {
        type: Array,
        required: true,
    },
    alignment: {
        type: Array,
        required: false,
    },
    sort: {
        type: Object,
        default: { asc: false, col: "" },
        required: false,
    },
});
const emit = defineEmits(["update:sort"]);
</script>

<template>
    <table cellpadding="5" class="w-full">
        <thead class="tableHead">
            <tr>
                <th
                    v-for="(column, i) in columns"
                    :key="column"
                    :align="alignment[i]"
                >
                    <div
                        class="w-fit font-bold py-1 my-0.5"
                    >
                        {{ column.label }}
                    </div>
                </th>
            </tr>
        </thead>

        <tbody>
            <slot />
        </tbody>
    </table>
</template>

<style scoped>
thead,
tbody,
tr {
    width: 100%;
}

.tableHead {
    color: #575757;
    border-bottom: solid 1px #ededed;
}
</style>
