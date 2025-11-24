<template>
    <div class="container-xl mt-4">
        <Header />
        <div class="row g-4 mt-2">
            <div class="col-12">
                <Main :countryList="countryFullList.list" />
            </div>
            <div class="col-md-4 col-12">
                <Table />
            </div>
            <div class="col-md-8 col-12">
                <iframe 
                    src="https://s.tradingview.com/embed-widget/forex-cross-rates/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A400%2C%22currencies%22%3A%5B%22USD%22%2C%22KZT%22%5D%7D" 
                    width="100%" 
                    height="100%"
                    class="rounded-4 border p-1" 
                    loading="lazy"
                    frameborder="0">
                </iframe>
            </div>
        </div>
        <footer class="my-5 d-flex gap-1 flex-column align-items-center justify-content-center opacity-75">
            <p class="m-0">Built with ❤️ by <a target="_blank" href="https://temirkhan.vercel.app">Temirkhan</a></p>
            <p class="m-0">Project at <a target="_blank" href="https://github.com/DreamerView/skyflex">Github</a></p>
            <a href="https://www.exchangerate-api.com" class="text-center mt-4">Rates By Exchange Rate API</a>
        </footer>
    </div>
</template>

<script setup>
    import Main from './components/Main.vue';
    import Table from './components/Table.vue';
    import Header from './components/Header.vue';
    import { useCountryStore } from "./stores/country.js";
    import { onMounted } from 'vue';
    const countryFullList = useCountryStore();
    countryFullList.loadRates("USD");
    onMounted(()=>{
        console.log(countryFullList)
    })
</script>