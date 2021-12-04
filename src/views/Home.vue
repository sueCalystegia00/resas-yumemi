<template>
  <div class="home">
    <p v-if="error">エラーが出てます</p>
    <CheckBoxes
      :prefectures="prefectures"
      @changeCheckedPrefectures="changeCheckedPrefectures"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CheckBoxes from "/src/components/CheckBoxes";
export default {
  name: "Home",
  components: {
    CheckBoxes,
  },
  data() {
    return {
      checkedPrefecturesCodes: [],
    };
  },
  computed: {
    ...mapState(["error", "prefectures", "populations"]),
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
