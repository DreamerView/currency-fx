<template>
    <div class="modal fade" id="findMyLocationModal" tabindex="-1" aria-labelledby="findMyLocationModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content rounded-4">
                <div class="modal-header border-0">
                    <h1 class="modal-title fs-5" id="findMyLocationModalLabel">Switch to Local Currency?</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <p class="m-0" style="font-size: 1.1rem;">You're in <b class="d-inline-flex align-items-center gap-2">{{ country.name }}<FlagRender v-if="country.currency" :currency="country.currency"/></b>. Switch to the local currency?</p>
                </div>
                <div class="modal-footer border-0 w-100">
                    <div class="d-flex justify-content-between w-100 gap-3">
                        <button type="button" @click="confirmChange" class="btn btn-primary rounded-4 border-0 w-100">Yes, change</button>
                        <button type="button" class="btn btn-outline-secondary rounded-4 border-0 w-100" data-bs-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import * as bootstrap from "bootstrap";
    import { onBeforeMount, onMounted,reactive } from "vue";
    import { useCountryStore } from "../stores/country.js";
    import FlagRender from "./FlagRender.vue";

    const countryStore = useCountryStore();

    const country = reactive({name:"",code:"",currency:null})

    const fetchData = async() => {
        try {
            const get = sessionStorage.getItem("LocalCurrency");
            console.log(get)
            if(get) return;
            const req = await fetch("https://ipwho.is");
            if(!req.ok) throw new Error("Fetching error");
            const res = await req.json();
            const find = countryStore.fullList.find(f=>f.code.toLowerCase() === res.country_code.toLowerCase());
            country.name = find.name;
            country.code = find.country_code;
            country.currency = find.currency;
            const modalEl = document.getElementById("findMyLocationModal");
            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
        } catch(error) {
            console.error("Error FindMyLocation",error);
        }
    }

    const confirmChange = () => {
        if(!country.code) return;
        countryStore.currency.from.currencyCode = country.currency;
        countryStore.currency.from.value = 0;
        countryStore.loadRates(country.currency);
        const modalEl = document.getElementById("findMyLocationModal");
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.hide();
        sessionStorage.setItem("LocalCurrency",country.currency);
    }

    onMounted(()=>
        window.addEventListener("load",fetchData)
    );

    onBeforeMount(()=>
        window.removeEventListener("load",fetchData)
    )
</script>