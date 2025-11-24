<template>
    <div class="col-md-5 col-12 d-flex flex-column gap-2" :class="hideEl">

        <!-- Валюта -->
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

        <!-- Поле ввода -->
        <div class="d-flex gap-1 align-items-center" :style="{ fontSize: fontSize + 'px' }">
            <p class="m-0 p-0">{{ info.symbol }}</p>

            <input
                ref="inputRef"
                type="text"
                class="form-control border-0 p-0 m-0"
                style="font-size: 3rem;"
                inputmode="decimal"
                autocomplete="off"
                placeholder="0"
                @blur="$emit('blur')"
            />
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import Cleave from "cleave.js";
import { useCountryStore } from "../stores/country.js";
import FlagRender from "./FlagRender.vue";
import { useAutoFontResize } from "../utils/useAutoFontResize.js";

const props = defineProps({
    currency: String,
    modelValue: Number,
    hideEl: String,
    mode: String
});

const emit = defineEmits(["update:modelValue", "blur"]);

const store = useCountryStore();
const inputRef = ref(null);
let cleave = null;

const selectModal = () => {
    store.lastSelectedModal = props.mode;
};

const info = computed(() =>
    store.fullList.find(f => f.currency === props.currency) || {
        name: "",
        currency: props.currency,
        symbol: ""
    }
);

/* --------------------------------------------------
   INIT CLEAVE
-------------------------------------------------- */
onMounted(() => {
    cleave = new Cleave(inputRef.value, {
        numeral: true,
        numeralThousandsGroupStyle: "thousand", // пробелы
        numeralDecimalMark: ".",                // дробь
        delimiter: " ",                         // разделитель тысяч
        numeralDecimalScale: 6,                 // до 6 знаков дроби
        numeralPositiveOnly: true,
        onValueChanged: (e) => {
            const num = Number(e.target.rawValue);
            emit("update:modelValue", num);
        }
    });

    // Когда открываем приложение — синхронизируем
    if (props.modelValue) {
        cleave.setRawValue(props.modelValue);
    }
});

/* --------------------------------------------------
   Если модель меняется извне — обновляем Cleave
-------------------------------------------------- */
watch(
    () => props.modelValue,
    (val) => {
        if (!cleave) return;
        if (document.activeElement === inputRef.value) return; // не мешаем вводу
        cleave.setRawValue(val || "");
    }
);

const {fontSize} = useAutoFontResize(inputRef, () => props.modelValue, {
  baseFont: 48,
  minFont: 20
});
</script>