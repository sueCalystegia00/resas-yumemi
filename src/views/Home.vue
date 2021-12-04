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
    changeCheckedPrefectures(checkedPrefectures) {
      this.checkedPrefecturesCodes = checkedPrefectures.map((pref) => {
        if (!this.populations[pref.prefCode]) {
          this.$store.dispatch("getPopulations", pref);
        }
        return pref.prefCode;
      });
    },
  },
};
</script>
