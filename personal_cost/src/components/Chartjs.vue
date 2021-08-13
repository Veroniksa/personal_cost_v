

<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: ["categories", "options", "paymentsList"],
  name: "Chartjs",

/*   computed: {
    testData() {
      return this.categories.map((c) => {
        return this.paymentsList.reduce((total, p) => {
          if (p.categories === c) {
            total += p.value;
          }
          return total;
        }, 0);
      });
    },
  }, */
/* 
    watch: {
    categories(value) {
      this.chartData.labels = value;
    },
    paymentList(value) {
      this.chartData.datasets[0].data = this.testData;
      this.renderChart(this.chartData, this.options);
      return value;
    },
  }, */

/*   options: {
    type: Object,
    default: null,
  }, */
  methods: {
    setUp(categories){
      this.renderChart({
        labels: categories.map(c=>c.title),
        datasets: [
          {
            label: "Chart",
            data: [12, 5,6,7,9,32],
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
          }
        ]
      })
    }
  },

  mounted(){
    setTimeout(this.setUp(), 3000)
    
},
}

</script>
