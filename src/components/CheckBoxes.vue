<template>
  <div class="checkboxes">
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
      <label :for="prefecture.prefCode">{{ prefecture.prefName }}</label>
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
  watch: {
    checkedPrefectures() {
      const prefCodes = this.checkedPrefectures.map(
        (prefecture) => prefecture.prefCode
      );
      console.log(prefCodes);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.checkboxes {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.box-wrapper {
  position: relative;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

input {
  display: none;
}

label {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background-color: #d3d3d3;
  color: #000000;
  border-radius: 10px;
  cursor: pointer;
}

input:checked + label {
  background-color: #000000;
  color: #ffffff;
}
</style>
