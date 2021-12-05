<template>
  <div class="home">
    <p v-if="error">エラーが出てます</p>
    <Graph :seriesData="getCheckdPopulations(checkedPrefecturesCodes)" />
    <CheckBoxes
      :prefectures="prefectures"
      @changeCheckedPrefectures="changeCheckedPrefectures"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Graph from "/src/components/Graph";
import CheckBoxes from "/src/components/CheckBoxes";
export default {
  name: "Home",
  components: {
    Graph,
    CheckBoxes,
  },
  data() {
    return {
      /**
       * @type {number[]} チェックボックスで指定された都道府県の都道府県コード
       */
      checkedPrefecturesCodes: [],
    };
  },
  computed: {
    ...mapState(["error", "prefectures", "populations"]),
    ...mapGetters(["getCheckdPopulations"]),
  },
  mounted() {
    this.$store.dispatch("getPrefectures");
  },
  methods: {
    /**
     * チェックが付いた都道府県コードの更新と，未取得データに対するAPIの発火
     * @param {object[]} checkedPrefectures - チェックが付いた都道府県のデータ
     */
    async changeCheckedPrefectures(checkedPrefectures) {
      this.checkedPrefecturesCodes = await Promise.all(
        checkedPrefectures.map(async (pref) => {
          if (!this.populations[pref.prefCode]) {
            await this.$store.dispatch("getPopulations", pref);
          }
          return pref.prefCode;
        })
      );
    },
  },
};
</script>
