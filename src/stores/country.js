import { defineStore } from "pinia";
import countryList from "../data/country.json";

export const useCountryStore = defineStore("country", {
  state: () => ({
    list: countryList,
    rates: {},       // { USD: {...}, EUR: {...} }
    mainInfo:{},
    base: null,
    loading: false,
    error: null
  }),

  getters: {
    // объединяем list + rates + code
    fullList: (state) => {
      return state.list.map(item => ({
        ...item,
        code: item.country_code.toLowerCase(),
        rate: state.rates[item.currency] ?? null
      }));
    }
  },

  actions: {
    async loadRates(code) {
      // Если уже есть в state → повторно не скачиваем
      if (this.rates[code]) {
        this.base = code;
        return;
      }

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