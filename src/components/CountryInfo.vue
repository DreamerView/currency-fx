<template>
    <div class="p-4 bg-body-tertiary border rounded-4">

        <div v-if="loading" class="spinner-border text-secondary fs-5 mb-3"></div>

        <!-- Шапка -->
        <div v-if="!loading" class="d-flex gap-3 align-items-center mb-3">
            <img :src="flag" width="48" loading="lazy" class="rounded-2" />
            <div class="fw-bold fs-5">{{ title }}</div>
        </div>

        <!-- Шаблон страны -->
        <CountryDetails v-if="isCountry && !loading" :info="info" />

        <!-- Шаблон региона -->
        <RegionDetails v-if="isRegion && !loading" :info="regionData" />

    </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import CountryDetails from "./CountryDetails.vue";
import RegionDetails from "./RegionDetails.vue";

const props = defineProps({
    country: String, 
    currency: String
});

const loading = ref(true);
const info = ref({});
const regionData = ref(null);

const EU_DATA = {
    name: "European Union",
    flag: "https://flagcdn.com/eu.svg",
    capital: "Brussels",
    region: "Europe",
    population: 447000000,
    area: "4 233 000 km²",
    languages: ["English","French","German","Spanish","Italian","Polish","Dutch","Romanian"],
    countries: [
        "Austria","Belgium","Bulgaria","Croatia","Cyprus","Czechia","Denmark",
        "Estonia","Finland","France","Germany","Greece","Hungary","Ireland",
        "Italy","Latvia","Lithuania","Luxembourg","Malta","Netherlands",
        "Poland","Portugal","Romania","Slovakia","Slovenia","Spain","Sweden"
    ],
    maps: {
        google: "https://www.google.com/maps/place/European+Union",
        osm: "https://www.openstreetmap.org/relation/51477"
    }
};

const isEU = computed(() => props.country.toLowerCase() === "eu");
const isCountry = computed(() => !isEU.value && props.country.length === 2);
const isRegion = computed(() => isEU.value);

const title = computed(() => (isEU.value ? EU_DATA.name : info.value.name));
const flag = computed(() => (isEU.value ? EU_DATA.flag : info.value.flag));

async function loadCountry(code) {
    const req = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const data = await req.json();
    const c = data[0];

    info.value = {
        name: c.name.official,
        flag: c.flags.svg,
        capital: c.capital?.[0] || "-",
        region: c.region,
        population: c.population.toLocaleString(),
        area: `${c.area.toLocaleString()} km²`,
        timezones: c.timezones,
        map: c.maps.googleMaps,
        map2:c.maps.openStreetMaps,
        lang:c.languages
    };
}

watch(
    () => props.country,
    async val => {
        loading.value = true;

        if (isEU.value) {
            regionData.value = EU_DATA;
            loading.value = false;
            return;
        }

        await loadCountry(val);

        loading.value = false;
    },
    { immediate: true }
);
</script>
