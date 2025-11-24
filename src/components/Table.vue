<template>
    <div :class="hideEl" class="m-0">
        
        <!-- SEARCH -->
        <input 
            type="text" 
            v-model="search"
            class="form-control bg-body-secondary py-2 px-4 rounded-4 mb-3"
            placeholder="Search"
        />

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Currency</th>
                    <th scope="col">Name</th>
                    <th class="text-end" scope="col">Value</th>
                </tr>
            </thead>

            <tbody>

                <!-- ALWAYS SHOW FIRST ITEM -->
                <tr v-if="firstItem">
                    <th class="d-flex align-items-center gap-2" scope="row">
                        <FlagRender :currency="firstItem.currency" />
                        {{ firstItem.currency }}
                    </th>
                    <td>{{ firstItem.name }}</td>
                    <td class="text-end">{{ firstItem.rate }}</td>
                </tr>

                <!-- SEARCH / REMAINING ITEMS -->
                <tr 
                    v-for="item in visibleList"
                    :key="item.currency"
                >
                    <th class="d-flex align-items-center gap-2" scope="row">
                        <FlagRender :currency="item.currency" />
                        {{ item.currency }}
                    </th>
                    <td>{{ item.name }}</td>
                    <td class="text-end">{{ item.rate }}</td>
                </tr>

            </tbody>
        </table>

        <!-- LOAD MORE -->
        <div class="d-flex justify-content-center">
            <button 
                class="btn bg-body-secondary rounded-4 border btn-sm px-3"
                v-if="filtered.length > 3"
                @click="expanded = !expanded"
            >
                {{ expanded ? "Hide" : "Load more" }}
            </button>
        </div>

    </div>
</template>

<script setup>
import { onMounted,onBeforeUnmount } from 'vue';
import { ref, computed } from "vue";
import { useCountryStore } from "../stores/country.js";
import FlagRender from "./FlagRender.vue";

const countryFullList = useCountryStore();

const search = ref("");
const expanded = ref(false);

// FIRST ITEM ALWAYS SHOWN
const firstItem = computed(() => countryFullList.fullList[0]);

// Filter except first item
const filtered = computed(() => {
    const list = countryFullList.fullList.slice(1);

    if (!search.value) return list;

    const s = search.value.toLowerCase();

    return list.filter(item =>
        item.currency.toLowerCase().includes(s) ||
        item.name.toLowerCase().includes(s)
    );
});

// Logic for load more toggle
const visibleList = computed(() => {
    if (expanded.value) return filtered.value;
    return filtered.value.slice(0, 3);
});
const hideEl = ref("");

const updateWidth = () => {
    hideEl.value = window.innerWidth >= 767?"border p-3 rounded-4":"border-top border-1 pt-4";
}

onMounted(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", updateWidth);
});
</script>