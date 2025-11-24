import { defineStore } from "pinia";
import countryList from "../data/country.json";

export const useCountryStore = defineStore("country", {
  state: () => ({
    list: countryList,
    rates: {},       // { USD: {...}, EUR: {...} }
    mainInfo:{},
    base: null,
    lastSelectedModal: "from",
    loading: true,
    error: null,
    currency:{from:{currencyCode:"USD",value:0},to:{currencyCode:"EUR",value:0}}
  }),

  getters: {
    fullList: (state) => {

      function formatNumber(num) {
        return new Intl.NumberFormat("ru-RU", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(num);
      }

      // 1. объединяем list + rates
      let arr = state.list.map(item => ({
        ...item,
        code: item.country_code.toLowerCase(),
        rate: state.rates[item.currency] ?? null,

        // 🔥 multiple-mode: сразу считаем конвертацию
        converted: state.currency.from.value
          ? formatNumber(state.currency.from.value * (state.rates[item.currency] ?? 0))
          : "0.00"
      }));

      // 2. код валюты FROM
      const fromCode = state.currency.from.currencyCode;

      // 3. найти страну
      const found = arr.find(f => f.currency === fromCode);

      if (found) {
        // убрать старый
        arr = arr.filter(f => f.currency !== fromCode);

        // вставить первым
        arr.unshift(found);
      }

      return arr;
    }
  },


  actions: {
    async loadRates(code) {

      this.loading = true;
      this.error = null;

      try {
        const url = `https://open.er-api.com/v6/latest/${code}`;
        const res = await fetch(url);
        const data = await res.json();

        console.log(data)

        if (data.result !== "success") {
          throw new Error("API Error");
        }

        // Сохраняем в state, можно переиспользовать
        this.rates = data.rates;
        this.base = code;
        this.mainInfo['last_update'] = data.time_last_update_utc;
        this.mainInfo['next_update'] = data.time_next_update_utc;
        this.mainInfo['provider'] = data.provider;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    convert(amount, from, to) {
      if (!this.rates[from]) return null;
      return amount * this.rates[from][to];
    }
  }
});