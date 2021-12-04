<template>
  <div class="boxes">{{ prefectures }}</div>
</template>

<script>
export default {
  name: "CheckBoxes",
  props: {
    prefectures: Array,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
