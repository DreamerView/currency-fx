<template>
    <div class="d-flex flex-column gap-3 m-0">

        <InfoRow icon="star" label="Capital" :value="info.capital" />
        <InfoRow icon="globe2" label="Region" :value="info.region" />
        <InfoRow icon="people" label="Population" :value="info.population" />
        <InfoRow icon="map" label="Area" :value="info.area" />

        <p class="m-0">
            <i class="bi bi-translate"></i> Languages:
            <span v-for="(lang,index) in langArray" :key="index">
                <b>{{ lang }}</b><span v-if="index < langArray.length - 1">, </span>
            </span>
        </p>

        <div class="d-flex flex-wrap gap-2">
            <a target="_blank" :href="info.map" class="btn btn-sm btn-dark rounded-4">
                <i class="bi bi-google"></i> Google Maps
            </a>
            <a target="_blank" :href="info.map2" class="btn btn-sm btn-dark rounded-4">
                <i class="bi bi-geo"></i> OSM
            </a>
        </div>

    </div>
</template>

<script setup>
import { computed } from "vue";
import InfoRow from "./InfoRow.vue";

const props = defineProps({
    info: Object
});

const langArray = computed(() => Object.values(props.info.lang || {}));
</script>