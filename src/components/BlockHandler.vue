<template>
    <div class="row">
        <Block mode="from" :currency="country.currency.from.currencyCode" v-model.number="fromValue" @blur="onBlurTo" :hideEl="hideEl" />
        <div class="col-md-2 col-12 d-flex align-items-center justify-content-md-center justify-content-end">
            <button class="btn btn-lg rounded-circle bg-body-secondary" @click="changeCurrency" style="width:60px;height:60px;">
                <i class="bi bi-arrow-left-right d-md-block d-none"></i>
                <i class="bi bi-arrow-down-up d-md-none d-block"></i>
            </button>
        </div>
        <Block mode="to" :currency="country.currency.to.currencyCode" v-model.number="toComputed" @blur="onBlurTo" :hideEl="hideEl" />
    </div>
</template>

<script setup>
    import { onMounted,onBeforeUnmount,ref, reactive, computed } from 'vue';
    import Block from './Block.vue';
    const hideEl = ref("");

    import { useCountryStore } from "../stores/country.js";

    const country = useCountryStore();

    // Удобные ссылки
    const from = country.currency.from; 
    const to   = country.currency.to;

    const changeCurrency = () => {
        const fromCode = from.currencyCode;
        const toCode = to.currencyCode;

        const fromValue = from.value;
        const toValue = to.value;

        // меняем валюты местами
        from.currencyCode = toCode;
        to.currencyCode = fromCode;

        country.loadRates(from.currencyCode)

        // меняем значения местами
        from.value = fromValue;

    };


    const fromValue = computed({
        get: () => from.value,
        set: (val) => {
            from.value = val;
        }
    });

    // Находим курс выбранной валюты
    const rate = computed(() => {
    const selected = country.fullList.find(
        (f) => f.currency === to.currencyCode
    );
    return selected?.rate || 1;
    });

    function formatCurrencyResult(num) {
        if (!isFinite(num)) return 0;

        // Преобразуем в строку для защиты от scientific notation
        let s = num.toString();

        if (s.includes('e')) {
            num = Number(num.toFixed(10));
            s = num.toString();
        }

        if (s.length > 20) {
            num = Number(s.slice(0, 20));
        }

        return Number(num.toFixed(2)); // ВОЗВРАЩАЕМ ЧИСЛО
    }





    const isTypingTo = ref(false);

    const toComputed = computed({
        get() {
            return formatCurrencyResult(from.value * rate.value);
        },

        set(val) {
            isTypingTo.value = true;

            // Показываем ввод (строго без форматирования)
            to.value = val;

            // Пересчитываем левое поле с округлением
            const raw = val / rate.value;
            from.value = formatCurrencyResult(raw);
        }
    });


    function onBlurTo() {
        isTypingTo.value = false;
        to.value = formatCurrencyResult(to.value);
    }



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