<template>
  <div class="checkboxes">
    <div v-for="region in regions" :key="region.name" class="region">
      <h3>{{ region.name }}</h3>
      <div class="box-container">
        <div
          v-for="prefecture in region.area"
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
  computed: {
    regions() {
      return this.prefectures.reduce(
        (acc, pref) => {
          if (pref.prefCode >= 1 && pref.prefCode <= 7) {
            acc[0].area.push(pref);
          } else if (pref.prefCode >= 8 && pref.prefCode <= 14) {
            acc[1].area.push(pref);
          } else if (pref.prefCode >= 15 && pref.prefCode <= 23) {
            acc[2].area.push(pref);
          } else if (pref.prefCode >= 24 && pref.prefCode <= 30) {
            acc[3].area.push(pref);
          } else if (pref.prefCode >= 31 && pref.prefCode <= 35) {
            acc[4].area.push(pref);
          } else if (pref.prefCode >= 36 && pref.prefCode <= 39) {
            acc[5].area.push(pref);
          } else if (pref.prefCode >= 40 && pref.prefCode <= 47) {
            acc[6].area.push(pref);
          }
          return acc;
        },
        [
          { name: "北海道・東北", area: [] },
          { name: "関東", area: [] },
          { name: "中部", area: [] },
          { name: "近畿", area: [] },
          { name: "中国", area: [] },
          { name: "四国", area: [] },
          { name: "九州・沖縄", area: [] },
        ]
      );
    },
  },
  watch: {
    checkedPrefectures() {
      this.$emit("changeCheckedPrefectures", this.checkedPrefectures);
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 15px;
}
.region {
  width: 100%;
}
h3 {
  margin: 0 0 10px 10px;
}
.box-container {
  width: 100%;
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

/* over iPhone12/13 Pro */
@media screen and (min-width: 428px) {
  .box-container {
    grid-template-columns: repeat(4, 1fr);
  }
}
/* over iPad */
@media screen and (min-width: 768px) {
  .box-container {
    grid-template-columns: repeat(5, 1fr);
  }
}
/* over iPad Pro*/
@media screen and (min-width: 1024px) {
  .box-container {
    grid-template-columns: repeat(7, 1fr);
  }
}
</style>
