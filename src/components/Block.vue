<template>
    <div class="col-md-5 col-12 d-flex flex-column gap-2" :class="hideEl">

        <div 
            class="d-inline-block py-1 px-3 border bg-body-secondary rounded-4 align-self-start"
            style="cursor:pointer"
            data-bs-toggle="modal"
            data-bs-target="#chooseCountryModal"
            @click="selectModal"
        >
            <div class="d-flex align-items-center gap-2">
                <FlagRender :currency="currency" />
                <p class="m-0">{{ info.currency }} - {{ info.name }}</p>
                <i class="bi bi-caret-down-fill"></i>
            </div>
        </div>

        <div class="d-flex gap-1 align-items-center" style="font-size: 3rem;">
            <p class="m-0 p-0">{{ info.symbol }}</p>

            <input
                type="text"
                class="form-control border-0 p-0 m-0"
                style="font-size: 3rem;"
                :value="textValue"
                @input="onInput"
                @blur="$emit('blur')"
                inputmode="decimal"
                autocomplete="off"
                placeholder="0"
            />
        </div>

    </div>
</template>

<script setup>
import { computed } from "vue";
import { useCountryStore } from "../stores/country.js";
import FlagRender from "./FlagRender.vue";

const props = defineProps({
    currency: String,
    modelValue: Number,
    hideEl: String,
    mode: String
});

const emit = defineEmits(["update:modelValue","blur"]);

const store = useCountryStore();

const selectModal = () => {
    store.lastSelectedModal = props.mode;
}

const info = computed(() =>
    store.fullList.find(f => f.currency === props.currency) || {
        name: "",
        currency: props.currency,
        symbol: ""
    }
);

// показываем число как строку
const textValue = computed(() => {
    if (props.modelValue === 0 || props.modelValue === null) return "";
    return props.modelValue.toString();
});

// фильтруем ввод
function sanitize(str) {
    str = str.replace(/,/g, ".");        // запятая → точка
    str = str.replace(/[^\d.]/g, "");    // только цифры и точка

    const parts = str.split(".");
    if (parts.length > 2) {
        str = parts[0] + "." + parts.slice(1).join("");
    }

    return str;
}

function toNumber(str) {
    const num = Number(str);
    if (!isFinite(num) || isNaN(num)) return 0;
    return num;
}

function onInput(e) {
    const raw = e.target.value;
    const clean = sanitize(raw);
    const num = toNumber(clean);

    // показываем текст без форматирования
    e.target.value = clean;

    // передаём только число вверх
    emit("update:modelValue", num);
}
</script>
