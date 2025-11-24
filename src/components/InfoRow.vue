<template>
    <p class="m-0">
        <i :class="`bi bi-${icon}`"></i>
        {{ label }}:
        <b>{{ value }}</b>
    </p>
</template>

<script setup>
defineProps({
    icon: String,
    label: String,
    value: [String, Number]
});
</script>
