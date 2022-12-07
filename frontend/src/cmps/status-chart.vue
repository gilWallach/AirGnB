<template>
  <section v-if="orders" class='status-chart'>
    <div class="chart-container">
      <h3>Orders status average</h3>
      <DoughnutChart :chartData="getStatusData" :options="options"/>
    </div>
  </section>
</template>
<script>
import { DoughnutChart } from "vue-chart-3"
import { Chart, registerables } from "chart.js"
Chart.register(...registerables);

export default {
  name: 'status-chart',
  props: {
    orders: {
      type: Array,
    },
  },
  data() {
    return {
      statusData: ['approved', 'pending', 'declined'],
      options: {
        plugins: {
          legend: {
            display: false,
          }
        }
      }
    }
  },
  created() {},
  methods: {},
  computed: {
    getStatusData() {
      const data = this.statusData.map(status => {
        const dataInNums = this.orders.reduce(
          (acc, order) => {
            order.status === status
              ? acc++
              : acc
            // console.log(acc)
            return acc
            },
              0
        )
        return dataInNums / this.orders.length * 100
      })
      return {
        statusData: this.statusData,
        datasets: [{
          status: 'Status Data',
          borderRadius: 6,
          data,
          backgroundColor: ["rgb(0, 166, 0)", "rgb(218, 200, 1)", "rgb(161, 0, 0)"]
        }]
      }
    }
  },
  components: {
    DoughnutChart
  }
}
</script>