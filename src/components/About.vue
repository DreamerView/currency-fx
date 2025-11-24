<template>
    <div>
        <div class="border rounded-4 p-3 m-0 bg-body-tertiary d-flex flex-column gap-3">
            <h4 class="m-0 mb-2">👋🏻 About app</h4>
            <p class="m-0"><i class="bi bi-activity"></i> Provider:
                <div v-if="countryFullList.loading" class="spinner-border text-secondary" role="status" style="width:1rem;height:1rem;">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <b v-if="!countryFullList.loading">{{ countryFullList.mainInfo?.provider || ""}}</b>
            </p>
            <p class="m-0"><i class="bi bi-compass"></i> Country API:
                <div v-if="countryFullList.loading" class="spinner-border text-secondary" role="status" style="width:1rem;height:1rem;">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <b v-if="!countryFullList.loading">https://restcountries.com</b>
            </p>
            <p class="m-0"><i class="bi bi-clock-history"></i> Last update:
                <div v-if="countryFullList.loading" class="spinner-border text-secondary" role="status" style="width:1rem;height:1rem;">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <b v-if="!countryFullList.loading">{{ countryFullList.mainInfo.last_update? new Date(countryFullList.mainInfo.last_update).toLocaleString() : ""}}</b>
            </p>
            <p class="m-0"><i class="bi bi-hourglass-top"></i> Next update: 
                <div v-if="countryFullList.loading" class="spinner-border text-secondary" role="status" style="width:1rem;height:1rem;">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <b v-if="!countryFullList.loading">{{ countryFullList.mainInfo.next_update? new Date(countryFullList.mainInfo.next_update).toLocaleString() : ""}}</b>
            </p>
            <div class="d-flex flex-column gap-1 opacity-75" style="font-size: 0.8rem;">
                <p class="m-0 text-center">Built with ❤️ by <a target="_blank" href="https://temirkhan.vercel.app">Temirkhan</a></p>
                <p class="m-0 text-center">Project at <a target="_blank" href="https://github.com/DreamerView/skyflex">Github</a></p>
                <a href="https://www.exchangerate-api.com" class="text-center">Rates By Exchange Rate API</a>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useCountryStore } from "../stores/country.js";

    const countryFullList = useCountryStore();

</script>