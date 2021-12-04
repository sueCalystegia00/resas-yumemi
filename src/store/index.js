import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    /**
     * API通信の成功/失敗を管理
     * @type {bool}
     */
    error: false,
    /**
     * 都道府県一覧
     * @type {array}
     */
    prefectures: [],
    /**
     * 都道府県の人口構成データ(総人口)
     */
    population: [],
  },
  mutations: {
    setError: (state, payload) => (state.error = payload),
    setPrefectures: (state, payload) => (state.prefectures = payload),
    setPopulation: (state, payload) => state.population.push(payload),
  },
  actions: {
    /**
     * RESAS API から都道府県一覧を取得
     * @param {any(VuexContext)} context
     */
    getPrefectures: async (context) => {
      // 都道府県一覧の取得
      const response = await axios.get(
        "https://opendata.resas-portal.go.jp/api/v1/prefectures",
        {
          headers: { "X-API-KEY": process.env.VUE_APP_RESAS_API_KEY },
        }
      );
      if (response.data.message === null) {
        // 正常
        context.commit("setPrefectures", response.data.result);
      } else {
        // API通信失敗
        context.commit("setError", true);
      }
    },
    /**
     * RESAS API から指定の都道府県の総人口推移データを取得
     * @param {any(VuexContext)} context
     * @param {object} payload // 都道府県名，都道府県コードを持つオブジェクト
     */
    getPopulation: async (context, payload) => {
      // 人口構成データの取得
      const response = await axios.get(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${payload.prefCode}`,
        {
          headers: { "X-API-KEY": process.env.VUE_APP_RESAS_API_KEY },
        }
      );
      if (response.data.message === null) {
        // 正常
        // 総人口の値のみを配列として取り出す
        const populationData = response.data.result.data[0].data.map(
          (x) => x.value
        );
        const dataset = {
          [payload.prefCode]: {
            prefName: payload.prefName,
            data: populationData,
          },
        };
        context.commit("setPopulation", dataset);
      } else {
        // API通信失敗
        context.commit("setError", true);
      }
    },
  },
  modules: {},
});
