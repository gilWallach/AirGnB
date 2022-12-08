<template>
  <section v-if="orders" class="orders-list main-layout-list">
    <h1 class="fs22">Reservations</h1>
    <div class="content-container flex">

      <div class="list">
        <table>
          <tr>
            <th v-for="hr in tableHeadings" class="fs16">{{ hr }}</th>
          </tr>
          <tr v-for="currOrder in orders">
            <td class="buyer-details-td flex align-center justify-center">
              <div class="buyer-img-container">
                <img
                  v-if="currOrder.buyer.imgUrl"
                  :src="currOrder.buyer.imgUrl"
                  alt="buyer profile image"
                />
                <user-avatar v-else />
              </div>
            </td>
            <td>{{ currOrder.buyer.fullname }}</td>
            <td :class="styleStatus(currOrder.status)" class="fs18 bold">
              {{ currOrder.status }}
            </td>
            <td class="center-td">{{ formatGuests(currOrder.guests) }}</td>
            <td>{{ currOrder.startDate }}</td>
            <td>{{ currOrder.endDate }}</td>
            <td class="stay-name">{{ currOrder.stay.name }}</td>
            <td>{{ formatTotalPrice(currOrder.totalPrice) }}</td>
            <td>
              <select
                v-model="currOrder.status"
                name="status"
                :value="currOrder.status"
                @change="updateOrder(currOrder)"
              >
                <option value="approved">Approve</option>
                <option value="declined">Decline</option>
              </select>
            </td>
          </tr>
        </table>
      </div>
  
      <div class="charts-container">
        <status-chart />
      </div>
    </div>
  </section>
</template>
<script>
import userAvatar from '../assets/svg/user-avatar.vue'
import statusChart from '../cmps/status-chart.vue'

export default {
  name: 'orders-list',
  props: {},
  data() {
    return {
      tableHeadings: [
        '',
        'buyer',
        'Status',
        'Guests',
        'Check-in',
        'Check-out',
        'Listing',
        'Total Payout',
        'Actions',
      ],
      orders: null,
      statusData: ['Approved', 'Pending', 'Declined'],
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
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
    formatTotalPrice(totalPrice) {
      return totalPrice.toLocaleString('en-US', {
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
  components: {
    userAvatar,
    statusChart,
  },
}
</script>
