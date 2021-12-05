<template>
  <div class="graph">
    <vue-highcharts
      type="chart"
      :options="chartOptions"
      :redrawOnUpdate="true"
      :oneToOneUpdate="false"
      :animateOnUpdate="true"
      @updated="onUpdated"
    />
    {{ seriesData }}
  </div>
</template>

<script>
import VueHighcharts from "vue3-highcharts";
import { toRefs, computed } from "vue";

export default {
  name: "Graph",
  components: {
    VueHighcharts,
  },
  props: {
    seriesData: Array,
  },
  setup(props) {
    const { seriesData } = toRefs(props);
    const chartOptions = computed(() => ({
      chart: {
        type: "line",
      },
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
      series: seriesData.value,
    }));
    const onUpdated = () => {
      console.log("Chart updated");
    };
    return {
      chartOptions,
      onUpdated,
    };
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
