<template>
  <div class="boxes">
    <div
      v-for="prefecture in prefectures"
      :key="prefecture.prefCode"
      class="box-wrapper"
    >
      <input
        type="checkbox"
        class="check-box"
        :id="prefecture.prefCode"
        :value="prefecture"
        v-model="checkedPrefectures"
      />
      <div class="box-tile">
        <label :for="prefecture.prefCode">{{ prefecture.prefName }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckBoxes",
  props: {
    prefectures: Array,
  },
  data() {
    return {
      checkedPrefectures: [],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
