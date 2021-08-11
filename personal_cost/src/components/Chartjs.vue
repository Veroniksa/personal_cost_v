<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  name: "Chartjs",
  data() {},
  methods: {
    setUp() {
      this.renderChart({
        labels: [
          "Food",
          "Sport",
          "Education",
          "Entertaiment",
          "Navigation",
          "Family",
        ],
        datasets: [
          {
            label: "Chart",
            data: [738, 900, 3000, 1938, 100, 1468],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    },
  },

  mounted() {
    this.setUp();
  },
};
</script>
