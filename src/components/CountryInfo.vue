<template>
    <div class="p-4 bg-body-tertiary border rounded-4">

        <div v-if="loading" class="spinner-border text-secondary fs-5 mb-3" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div v-if="!loading" class="d-flex align-items-center mb-3">
            <img 
                :src="info.flag" 
                width="40"
                class="rounded-2 me-3"
                alt="flag"
            />
            <div class="fw-bold fs-5">{{ info.name }}</div>
        </div>

        <div class="d-flex flex-column gap-3 m-0">
            <p class="m-0"><i class="bi bi-star"></i> Capital: 
                <div v-if="loading" class="spinner-border text-secondary" role="status" style="width:1rem;height:1rem;">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <b v-if="!loading">{{ info.capital }}</b>
            </p>
            <p class="m-0"><i class="bi bi-globe2"></i> Region: 
                <div v-if="loading" class="spinner-border text-secondary" role="status" style="width:1rem;height:1rem;">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <b v-if="!loading">{{ info.region }}</b>
            </p>
            <p class="m-0"><i class="bi bi-people"></i> Population: 
                <div v-if="loading" class="spinner-border text-secondary" role="status" style="width:1rem;height:1rem;">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <b v-if="!loading">{{ info.population }}</b>
            </p>
            <p class="m-0"><i class="bi bi-map"></i> Area: 
                <div v-if="loading" class="spinner-border text-secondary" role="status" style="width:1rem;height:1rem;">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <b v-if="!loading">{{ info.area }}</b>
            </p>
            <p class="m-0"><i class="bi bi-translate"></i> Languages: 
                <div v-if="loading" class="spinner-border text-secondary" role="status" style="width:1rem;height:1rem;">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <template v-if="!loading">
                    <b v-for="(value, key, index) in info.lang" :key="key">
                        {{ value }}<span v-if="index < Object.keys(info.lang).length - 1">, </span>
                    </b>
                </template>
            </p>
            <p class="m-0">
                <i class="bi bi-clock-history"></i> Timezones: 

                <span v-if="loading" class="spinner-border text-secondary" 
                    role="status" style="width:1rem;height:1rem;">
                    <span class="visually-hidden">Loading...</span>
                </span>

                <template v-else>
                    <b>
                        {{ Object.values(info.timezones).join(", ") }}
                    </b>
                </template>
            </p>
            <div class="d-flex flex-wrap gap-2 justify-content-between">
                <a target="_blank" :href="info.map" class="btn btn-sm d-inline-flex gap-2 btn-secondary rounded-4">
                    <i class="bi bi-google"></i>
                    Open in Google Maps
                </a>
                <a target="_blank" :href="info.map2" class="btn btn-sm d-inline-flex gap-2 btn-secondary rounded-4">
                    <i class="bi bi-geo"></i>
                    Open in Open Streep Map
                </a>
            </div>
            <!-- <li><strong>Timezone:</strong> {{ info.timezones[0] }}</li> -->
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    country: String // <-- теперь передаём вручную!
});

const loading = ref(true);
const info = ref({});

async function loadByCountry(countryName) {
    try {
        loading.value = true;

        const req = await fetch(`https://restcountries.com/v3.1/alpha/${countryName}`);
        const data = await req.json();
        const c = data[0];

        console.log(c)

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

    } catch (err) {
        console.error(err);
    } finally {
        loading.value = false;
    }
}

watch(
    () => props.country,
    (val) => {
        if (val) loadByCountry(val);
    },
    { immediate: true }
);
</script>
