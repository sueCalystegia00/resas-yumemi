<template>
  <div class="graph">ぐらふ</div>
</template>

<script>
export default {
  name: "Graph",
  props: {
    prefectures: Array,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.graph {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
