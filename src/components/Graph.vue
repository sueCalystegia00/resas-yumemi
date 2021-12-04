<template>
  <div class="graph">
    <vue-highcharts
      type="chart"
      :options="chartOptions"
      :redrawOnUpdate="true"
      :oneToOneUpdate="false"
      :animateOnUpdate="true"
      @rendered="onRender"
      @update="onUpdate"
      @destroy="onDestroy"
    />
    {{ prefCodes }}
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
    prefCodes: Array,
  },
  computed: {
    chartOptions: () => ({
      title: {
        text: "都道府県別総人口推移",
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
          text: "Coin/h",
        },
      },
      xAxis: {
        type: "datetime",
        tickInterval: 86400 * 1000, // 1 day in ms
        labels: {
          rotation: 60,
        },
      },
      series: [
        {
          name: "ETH",
          data: [],
        },
        {
          name: "BTC",
          data: [],
        },
      ],
    }),
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
