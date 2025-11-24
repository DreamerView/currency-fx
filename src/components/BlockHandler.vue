<template>
    <div class="row">
        <Block currency="USD" :hideEl="hideEl" />
        <div class="col-md-2 col-12 d-flex align-items-center justify-content-md-center justify-content-end">
            <button class="btn btn-lg rounded-circle bg-body-secondary" style="width:60px;height:60px;">
                <i class="bi bi-arrow-left-right d-md-block d-none"></i>
                <i class="bi bi-arrow-down-up d-md-none d-block"></i>
            </button>
        </div>
        <Block currency="EUR" :hideEl="hideEl" />
    </div>
</template>

<script setup>
    import { onMounted,onBeforeUnmount,ref } from 'vue';
    import Block from './Block.vue';
    const hideEl = ref("");

    const updateWidth = () => {
        hideEl.value = window.innerWidth >= 767?"border p-4 rounded-4":"";
    }

    onMounted(() => {
        window.addEventListener("resize", updateWidth);
        updateWidth();
    });

    onBeforeUnmount(() => {
        window.removeEventListener("resize", updateWidth);
    });
</script>