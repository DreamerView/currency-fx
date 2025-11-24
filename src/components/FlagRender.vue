<template>
  <!-- рендерим ТОЛЬКО если есть код и нет ошибки -->
  <picture v-if="code && !error">
    <source
      :type="'image/webp'"
      :srcset="`
        https://flagcdn.com/20x15/${code}.webp,
        https://flagcdn.com/40x30/${code}.webp 2x,
        https://flagcdn.com/60x45/${code}.webp 3x
      `"
    />

    <source
      :type="'image/png'"
      :srcset="`
        https://flagcdn.com/20x15/${code}.png,
        https://flagcdn.com/40x30/${code}.png 2x,
        https://flagcdn.com/60x45/${code}.png 3x
      `"
    />

    <img
      :src="`https://flagcdn.com/20x15/${code}.png`"
      width="20"
      height="15"
      :alt="code ? code.toUpperCase() : ''"
      loading="lazy"
      @error="error = true"
    />
  </picture>
</template>

<script setup>
import { computed, ref } from "vue";
import { useCountryStore } from "../stores/country.js";

const props = defineProps({
  currency: {
    type: String,
    required: true
  }
});

const error = ref(false);
const countryFullList = useCountryStore();

// вычисляем код (или null)
const code = computed(() => {
  const c = countryFullList.list.find(f => f.currency === props.currency);
  return c ? c.country_code.toLowerCase() : null;
});
</script>
