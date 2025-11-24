<template>
    <Modal />
    <div class="container-xl my-4">
        <Header />
        <div class="row g-4 mt-2">
            <div class="col-12">
                <Main :countryList="countryFullList.list" />
            </div>
            <div class="col-lg-4 col-12">
                <Table />
            </div>
            <div class="col-lg-4 col-12">
                <CountryInfo :currency="info.currency" :country="info.code"  />
            </div>
            <div class="col-lg-4 col-12">
                <About />
            </div>
        </div>
    </div>
</template>

<script setup>
    import Main from './components/Main.vue';
    import Table from './components/Table.vue';
    import About from './components/About.vue';
    import CountryInfo from './components/CountryInfo.vue';
    import Header from './components/Header.vue';
    import { useCountryStore } from "./stores/country.js";
    import Modal from './components/Modal.vue';
    import { computed } from 'vue';
    const countryFullList = useCountryStore();
    countryFullList.loadRates(countryFullList.currency.from.currencyCode);
    const info = computed(() =>
        countryFullList.fullList.find(f => f.currency === countryFullList.currency.from.currencyCode) || {
            name: "",
            currency: props.currency,
            symbol: ""
        }
    );
</script>