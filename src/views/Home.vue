<template>
  <div class="home">{{ prefectures }}</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapState(["prefectures"]),
  },
  mounted() {
    this.$store.dispatch("getPrefectures");
  },
};
</script>
