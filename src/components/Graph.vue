<template>
  <div class="graph">
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
          text: "総人口推移",
          style: {
            "font-family": "Avenir, Helvetica, Arial, sans-serif",
            "-webkit-font-smoothing": "antialiased",
            "-moz-osx-font-smoothing": "grayscale",
            color: "#2c3e50",
            "font-weight": "bold",
            "font-size": "200%",
          },
        },
        yAxis: {
          title: {
            text: "人口数",
          },
          tickInterval: 500000,
        },
        xAxis: {
          type: "datetime",
          tickInterval: 5,
          labels: {
            rotation: 60,
          },
        },
        series: this.seriesData,
      };
    },
  },
  methods: {
    onRender() {
      console.log("Chart rendered");
    },
    onUpdated() {
      console.log("Chart updated");
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
}
</style>
