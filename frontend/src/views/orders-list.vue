<template>
  <section v-if="orders" class='orders-list main-layout-list'>
    <h1 class="fs22"> Reservation</h1>
    <div class="list">
      <table>
        <tr>
          <th v-for="hr in tableHeadings" class="fs16">{{ hr }}</th>
        </tr>
        <tr v-for="currOrder in orders">
          <td class="buyer-details-td flex align-center justify-center">
            <div class="buyer-img-container">
              <img v-if="currOrder.buyer.imgUrl" :src="currOrder.buyer.imgUrl" alt="">
              <user-avatar v-else/>
            </div>
            <p>{{currOrder.buyer.fullname}}</p>
          </td>
          <td :class="styleStatus(currOrder.status)" class="fs18 bold">{{ currOrder.status }}</td>
          <td class="center-td">{{ formatGuests(currOrder.guests) }}</td>
          <td>{{ currOrder.startDate }}</td>
          <td>{{ currOrder.endDate }}</td>
          <td>{{ formatCreatedAt(currOrder.createdAt) }}</td>
          <td>{{ currOrder.stay.name }}</td>
          <td>{{ formatTotalPrice(currOrder.totalPrice) }}</td>
          <td>
            <select v-model="currOrder.status" name="status" :value="currOrder.status" @change="updateOrder(currOrder)">
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="declined">Declined</option>
            </select>
          </td>
        </tr>
      </table>
    </div>
  </section>

  <section v-if="orders" class="charts">
    <div class="chart-container">
            <h3>Orders status average</h3>
            <DoughnutChart :chartData="getStatusData" />
        </div>
  </section>
</template>
<script>
import { DoughnutChart } from "vue-chart-3"
import { Chart, registerables } from "chart.js"

import userAvatar from '../assets/svg/user-avatar.vue'

Chart.register(...registerables);

export default {

  name: 'orders-list',
  props: {},
  data() {
    return {
      tableHeadings: ['', 'Status', 'Guests', 'Check-in', 'Check-out', 'Booked', 'Listing', 'Total Payout', 'Actions'],
      orders: null,
      statusData: ['Approved', 'Pending', 'Declined'],
            options: {
                plugins: {
                    legend: {
                        display: false,
                    }
                }
            }
    }
  },
  async created() {
    try {
      await this.$store.dispatch({ type: 'loadOrders' })
      this.orders = JSON.parse(JSON.stringify(this.$store.getters.orders))
    } catch (err) {
      throw err
    }
  },
  methods: {
    formatGuests(guests) {
      const guestsArr = Object.values(guests)
      if (!guestsArr.length) return guests
      return guestsArr.reduce((acc, n) => acc + n, 0)
    },
    formatCreatedAt(createdAt) {
      return new Date(createdAt).toLocaleDateString('en-US')
    },
    formatTotalPrice(totalPrice) {
      return (totalPrice).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
    },
    styleStatus(status) {
      return {
        approved: status === 'approved',
        pending: status === 'pending',
        declined: status === 'declined',
      }
    },
    async updateOrder(order) {
      await this.$store.dispatch({ type: 'updateOrder', order })
    },
  },
  computed: {
    getStatusData() {
            const data = this.statusData.map(status => {
              const dataInNums = this.orders.reduce(
                (acc, order) => {
                  order.status === status
                  ? acc + 1
                  : acc,
                  0

                  // console.log(acc)
                }
                )
                // console.log('dataInNums / this.statusData.length * 100', dataInNums / this.statusData.length * 100)
                return dataInNums / this.statusData.length * 100
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
    userAvatar,
    DoughnutChart
  }
}
</script>