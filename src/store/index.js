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
     * @type {object[]}
     */
    prefectures: [],
    /**
     * 都道府県の人口構成データ(総人口)
     * @type {object}
     */
    populations: {},
  },
  getters: {
    /**
     * 引数のコード配列に対応する都道府県の総人口推移データを返す
     * @param {number[]} prefCodes - 都道府県コードの配列
     * @returns {object[]} 該当都道府県の総人口推移データの配列
     */
    getCheckdPopulations: (state) => (prefCodes) => {
      return prefCodes.map((prefCode) => state.populations[prefCode]);
    },
  },
  mutations: {
    setError: (state, payload) => (state.error = payload),
    setPrefectures: (state, payload) => (state.prefectures = payload),
    setPopulations: (state, payload) => {
      state.populations[payload.key] = payload.value;
    },
  },
  actions: {
    /**
     * RESAS API から都道府県一覧を取得
     * @param {VuexContext} context
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
     * @param {VuexContext} context
     * @param {object} payload - 都道府県名(prefName)，都道府県コード(prefCode)を持つオブジェクト
     */
    getPopulations: async (context, payload) => {
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
          key: payload.prefCode,
          value: {
            name: payload.prefName,
            data: populationData,
          },
        };
        context.commit("setPopulations", dataset);
      } else {
        // API通信失敗
        context.commit("setError", true);
      }
    },
  },
  modules: {},
});
