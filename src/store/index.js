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
  },
  actions: {
    /**
     * RESAS API から都道府県一覧を取得
     * @param {*} context
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
  },
  modules: {},
});
