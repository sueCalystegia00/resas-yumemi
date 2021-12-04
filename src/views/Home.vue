<template>
  <div class="home">
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
  computed: {
    ...mapState(["prefectures"]),
  },
  mounted() {
    this.$store.dispatch("getPrefectures");
  },
  methods: {
    changeCheckedPrefectures: (checkedPrefectures) => {
      console.log(checkedPrefectures);
    },
  },
};
</script>
