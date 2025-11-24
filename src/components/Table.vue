<template>
    <div class="border rounded-4 p-3 m-0 bg-body-tertiary">
        
        <!-- SEARCH -->
        <input 
            type="text" 
            v-model="search"
            class="form-control border-secondary-subtle bg-body-secondary py-2 px-4 rounded-4 mb-3"
            placeholder="Search"
        />

        <table class="table table-transparent">
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
                    <td v-if="countryFullList.loading" class="text-end">
                        <div class="spinner-border" role="status" style="width:1rem;height:1rem;">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </td>
                    <td v-if="countryFullList.loading" class="text-end">{{ firstItem.rate }}</td>
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
                    <td v-if="countryFullList.loading" class="text-end">
                        <div class="spinner-border" role="status" style="width:1rem;height:1rem;">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </td>
                    <td v-if="!countryFullList.loading" class="text-end">{{ item.rate }}</td>
                </tr>

            </tbody>
        </table>

        <!-- LOAD MORE -->
        <div class="d-flex justify-content-center">
            <button 
                class="btn bg-body-secondary border-secondary-subtle rounded-4 border btn-sm px-3"
                v-if="filtered.length > 3"
                @click="expanded = !expanded"
            >
                {{ expanded ? "Hide" : "Load more" }}
            </button>
        </div>

    </div>
</template>

<script setup>
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
</script>

<style scoped>
    .table-transparent,
    .table-transparent td,
    .table-transparent th {
        background-color: transparent !important;
    }

</style>