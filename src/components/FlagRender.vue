<template>
  <!-- рендерим только если есть код и нет ошибки -->
  <picture v-if="code && !error">
    <source
      type="image/webp"
      :srcset="urls.srcsetWebp"
    />

    <source
      type="image/png"
      :srcset="urls.srcsetPng"
    />

    <img
      :src="urls.src"
      width="20"
      height="15"
      :alt="code.toUpperCase()"
      loading="lazy"
      @error="error = true"
    />
  </picture>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useCountryStore } from "../stores/country.js";

const props = defineProps({
  currency: {
    type: String,
    required: true
  }
});

// ⚙️ оптимизация рендера компонента
defineOptions({ memo: true });

// 🧠 кэш URL-ов флагов по country code
const flagUrlCache = {}; // { [code]: { src, srcsetWebp, srcsetPng } }

const error = ref(false);
const countryFullList = useCountryStore();

const code = computed(() => {
  const c = countryFullList.list.find(f => f.currency === props.currency);
  return c ? c.country_code.toLowerCase() : null;
});

// 🎯 вычисляем (и кэшируем) URL-ы для текущего code
const urls = computed(() => {
  if (!code.value) return { src: "", srcsetWebp: "", srcsetPng: "" };

  if (!flagUrlCache[code.value]) {
    const base = "https://flagcdn.com";
    const c = code.value;

    flagUrlCache[code.value] = {
      src: `${base}/20x15/${c}.png`,
      srcsetWebp: `
        ${base}/20x15/${c}.webp,
        ${base}/40x30/${c}.webp 2x,
        ${base}/60x45/${c}.webp 3x
      `.trim(),
      srcsetPng: `
        ${base}/20x15/${c}.png,
        ${base}/40x30/${c}.png 2x,
        ${base}/60x45/${c}.png 3x
      `.trim()
    };
  }

  return flagUrlCache[code.value];
});

// при смене валюты/страны сбрасываем ошибку,
// чтобы дать флагу шанс загрузиться снова
watch(
  () => code.value,
  () => {
    error.value = false;
  }
);
</script>
