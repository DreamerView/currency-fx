<template>
    <div class="d-flex flex-column gap-1 m-0">

        <p><i class="bi bi-globe"></i> Region: <b>{{ info.region }}</b></p>
        <p><i class="bi bi-people"></i> Population: <b>{{ info.population.toLocaleString() }}</b></p>
        <p><i class="bi bi-map"></i> Area: <b>{{ info.area }}</b></p>

        <p><i class="bi bi-translate"></i> Languages:
            <span v-for="(lang, i) in info.languages" :key="i">
                <b>{{ lang }}</b><span v-if="i < info.languages.length - 1">, </span>
            </span>
        </p>

        <p><i class="bi bi-flag"></i> Countries:
            <b>{{info.countries.join(", ") }}</b>
        </p>

        <div class="d-flex gap-2">
            <a :href="info.maps.google" target="_blank" class="btn btn-sm btn-dark rounded-4">
                <i class="bi bi-google"></i> Google Maps
            </a>
            <a :href="info.maps.osm" target="_blank" class="btn btn-sm btn-dark rounded-4">
                <i class="bi bi-geo"></i> OSM
            </a>
        </div>

    </div>
</template>

<script setup>
const props = defineProps({
    info: Object
});
</script>