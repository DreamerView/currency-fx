<template>
    <div class="container-xl">
        <BlockHandler/>
    </div>
</template>

<script setup>
    import BlockHandler from './BlockHandler.vue';
    const { countryList } = defineProps({
        countryList: {
            type: Array,
            required: true
        }
    });

    
</script>

<style scoped>
    :deep(.form-control:focus) {
        box-shadow: none !important;
        outline: none !important;
    }
</style>