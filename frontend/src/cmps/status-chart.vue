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
          backgroundColor: ["#77CEFF", "#0079AF", "#123E6B"]
        }]
      }
    }
  },
  components: {
    DoughnutChart
  }
}
</script>