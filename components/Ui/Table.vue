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
                    @click="emit('update:sort', { asc: !sort.asc, col: column.value })"
                >
                    <div
                        class="w-fit font-bold rounded cursor-pointer select-none hover:bg-stone-100 py-1 px-1.5 my-0.5"
                        :class="{ 'bg-stone-100': sort.col == column.value }"
                    >
                        <img
                            v-show="sort.col == column.value"
                            src="/images/icons/arrow-up.svg"
                            alt="ascending"
                            class="w-3.5 mr-0.5 inline-block"
                            :class="{ 'rotate-180': sort.asc }"
                        />
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
