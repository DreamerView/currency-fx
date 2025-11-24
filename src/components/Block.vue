<template>
    <div class="col-md-5 col-12 d-flex flex-column gap-2" :class="props.hideEl">
        <div class="d-inline-block py-1 px-3 border bg-body-secondary rounded-4 align-self-start" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#chooseCountryModal">
            <div class="d-flex align-items-center gap-2">
                <FlagRender :currency="props.currency" />
                <p class="m-0">{{ country.currency }} - {{ country.name }}</p>
                <i class="bi bi-caret-down-fill"></i>
            </div>
        </div>

        <div class="d-flex gap-1 align-items-center" style="font-size: 3rem;">
            <p class="m-0 p-0">{{ country.symbol || "" }}</p>
            <input type="text" class="form-control border-0 p-0 m-0" style="font-size: 3rem;" placeholder="0" inputmode="tel" />
        </div>
    </div>
</template>


<script setup>
    import { computed } from "vue";
    import FlagRender from "./FlagRender.vue";
    import { useCountryStore } from "../stores/country.js";

    const props = defineProps({
        hideEl: String,
        currency: String
    });

    const countryFullList = useCountryStore();

    const country = computed(() => {
        const c = countryFullList.list.find(f => f.currency === props.currency);
        if (!c) return null;

        return {
            ...c,
            code: c.country_code.toLowerCase()
        };
    });
</script>
