<template>
    <div class="modal fade" id="chooseCountryModal" tabindex="-1" aria-labelledby="chooseCountryModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                
                <div class="modal-header border-0">
                    <input 
                        class="form-control bg-body-secondary rounded-4 px-4"
                        placeholder="Search"
                        type="text"
                        v-model="searchQuery"
                    />
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    <div class="d-flex flex-wrap gap-2">
                        <div 
                            v-for="list in filteredList"
                            :key="list.currency"
                            style="cursor: pointer;"
                            @click="chooseCountry(list.currency)"
                            class="d-flex align-items-center gap-2 bg-body-secondary rounded-4 border px-3 py-1"
                        >
                            <FlagRender :currency="list.currency" />
                            {{ list.name }}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCountryStore } from "../stores/country.js";
import FlagRender from "./FlagRender.vue";
import * as bootstrap from "bootstrap";

const countryFullList = useCountryStore();
const searchQuery = ref("");

// 🔍 Фильтрация списка
const filteredList = computed(() => {
    const q = searchQuery.value.trim().toLowerCase();

    if (!q) return countryFullList.fullList;

    return countryFullList.fullList.filter((item) =>
        item.name.toLowerCase().includes(q) ||
        item.currency.toLowerCase().includes(q)
    );
});

const chooseCountry = (code) => {
    if(countryFullList.lastSelectedModal==="from") {
        countryFullList.currency.from.currencyCode = code;
        countryFullList.loadRates(code);
    } else {
        countryFullList.currency.to.currencyCode = code;
    }
    const modalEl = document.getElementById("chooseCountryModal");
    const modal = bootstrap.Modal.getInstance(modalEl);

    modal.hide();
}
</script>
