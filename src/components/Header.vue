<template>
    <Marque :list="countryFullList.rates" :loading="countryFullList.loading" />
</template>

<script setup>
    import Marque from './Marque.vue';
    import { useCountryStore } from "../stores/country.js";
    import { watchEffect } from 'vue';

    const countryFullList = useCountryStore();

    watchEffect(()=>{
        console.log(countryFullList.base)
    })

</script>