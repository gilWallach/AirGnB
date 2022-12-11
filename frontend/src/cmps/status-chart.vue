<template>
  <section v-if="orders" class='status-chart'>
    <div class="chart-container">
      <h3>Orders status average</h3>
      <DoughnutChart :chartData="getStatusData" :options="options" />
    </div>
  </section>
</template>
<script>
import { DoughnutChart } from "vue-chart-3"
import { Chart, registerables } from "chart.js"
Chart.register(...registerables);

export default {
  name: 'status-chart',
  data() {
    return {
      orders: this.$store.getters.orders,
      labels: ['Approved', 'Pending', 'Declined'],
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            boxWidth:1,
            position: 'right',
            labels: {
              font: {
                family: 'airBnb-Reg',
                size: '12px ',
              },
            }
          },
          // title: {
          // display: true,
          // text: 'Chart.js Doughnut Chart',
          // position: 'top',
          // },
        }
      },
    }
  },
  created() { },
  methods: {},
  computed: {
    getStatusData() {
      const data = this.labels.map(status => {
        const dataInNums = this.orders.reduce(
          (acc, order) => {
            order.status === status.toLowerCase()
              ? acc++
              : acc
            return acc
          },
          0
        )
        return dataInNums / this.orders.length * 100
      })
      return {
        labels: this.labels,
        datasets: [{
          status: 'Status Data',
          borderRadius: 6,
          data,
          backgroundColor: ["#08613f", "#E3B505", "#DB504A"]
        }]
      }
    }
  },
  components: {
    DoughnutChart
  }
}
</script>