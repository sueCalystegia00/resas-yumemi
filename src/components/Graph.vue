<template>
  <div class="graph">
    <transition name="fade">
      <div v-show="!seriesData.length" class="dialog">
        <h3>👇 都道府県を下から選んでね</h3>
        <p>人口グラフが表示されるよ</p>
      </div>
    </transition>
    <vue-highcharts
      type="chart"
      :options="chartOptions"
      :redrawOnUpdate="true"
      :oneToOneUpdate="true"
      :animateOnUpdate="true"
      @rendered="onRender"
      @updated="onUpdated"
      :key="reloadKey"
    />
  </div>
</template>

<script>
import VueHighcharts from "vue3-highcharts";

export default {
  name: "Graph",
  components: {
    VueHighcharts,
  },
  props: {
    seriesData: Array,
  },
  data() {
    return {
      reloadKey: false,
    };
  },
  computed: {
    chartOptions() {
      return {
        title: {
          text: "都道府県別 総人口の推移",
          style: {
            "font-family": "Avenir, Helvetica, Arial, sans-serif",
            "-webkit-font-smoothing": "antialiased",
            "-moz-osx-font-smoothing": "grayscale",
            color: "#2c3e50",
            "font-weight": "bold",
            "font-size": "1.5rem",
          },
        },
        yAxis: {
          title: {
            text: "人口(百万人)",
            align: "high",
            rotation: 0,
            offset: -40,
            x: 0,
            y: -10,
          },
          labels: {
            formatter: function () {
              return this.value / 1000000;
            },
          },
        },
        xAxis: {
          title: {
            text: "(年)",
            align: "high",
            opposite: false,
          },
          tickInterval: 1,
          categories: [...Array(18)].map((_, index) => 1980 + index * 5),
        },
        tooltip: {
          headerFormat: "{point.x}年<br>",
          pointFormat: "{series.name}: {point.y}人",
          crosshairs: true,
        },
        series: this.seriesData,
      };
    },
  },
  methods: {
    onRender() {
      //console.log("Chart rendered");
    },
    onUpdated() {
      //console.log("Chart updated");
      this.reloadKey = !this.reloadKey;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.graph {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vue-highcharts {
  width: 100%;
  height: 400px;
  box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 500ms 0s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.dialog {
  position: fixed;
  top: 55px;
  width: 100%;
  height: 340px;
  box-sizing: border-box;
  z-index: 9999;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #d7d7d784;
  border-radius: 10px;
}
h3,
p {
  margin: 0;
}
</style>
