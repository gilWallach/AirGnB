<template>
  <section v-if="orders.length && selectedStay" class="orders-summary">
    <div class="host-summary">
      <div class="stats-header">
        <h3>Good job!</h3>
        <p>Guests love what you're doing, Keep up the good work and review your stats!</p>
      </div>
      <div class="stats">
        <p class="fs16">Monthly earning:</p>
        <span>${{ monthlyEarning }}</span>
        <p class="fs16">Average rating:</p>
        <span>{{ averageRating() }}</span>
        <p class="fs16">Amount of reviews:</p>
        <span>{{ selectedStay.reviews.length }}</span>
      </div>

      <div class="charts-container">
        <status-chart />
      </div>
      <h1 class="fs22 orders-list-title">Reservations</h1>
    </div>

    <div v-for="currOrder in orders" class="orders-tables">
      <table> 
        <tr :class="bgStyleByStatus(currOrder.status)">
          <th>Buyer</th>
          <td class="buyer no-padding-inline">{{ currOrder.buyer.fullname }}</td>

          <th class="buyer-details-td flex align-center justify-center">
            <div class="buyer-img-container">
              <img :src="currOrder.buyer.imgUrl" alt="buyer profile image" />
              <!-- <img v-if="order.buyer.imgUrl" :src="currBuyer.imgUrl" alt="buyer profile image" />
              <user-avatar v-else /> -->
            </div>
          </th>
        </tr>
        <tr>
          <th>Status</th>
          <td :class="styleStatus(currOrder.status)" class="fs18 bold">
            {{ currOrder.status }}
          </td>
          <el-select @change="updateOrder(currOrder)" v-model="currOrder.status" class="m-2 "
            :placeholder="currOrder.status" size="small">
            <el-option v-for="status in options" :key="status.value" :label="status.label" :value="status.value" />
          </el-select>
        </tr>
        <tr>
          <th>Listing</th>
          <td class="stay-name">{{ currOrder.stay.name }}</td>
        </tr>
        <tr>
          <th>Guests</th>
          <td class="last-column">{{ formatGuests(currOrder.guests) }}</td>
        </tr>
        <tr>
          <td>
          <th>Check-in: </th>
          <p>{{ formatDate(currOrder.startDate) }}</p>
          <!-- <p>{{ currOrder.startDate }}</p> -->
          </td>
          <td class="center-td">
          <th class="no-padding-inline">Check-out: </th>
          <p>{{ currOrder.endDate }}</p>
          </td>
          <td class="end-td">
          <th class="no-padding-inline">Booked: </th>
          <p>{{ formatDate(currOrder.createdAt) }}</p>
          </td>
        </tr>
        <tr>
          <th>Total Payout</th>
          <td class="last-column">{{ formatTotalPrice(currOrder.totalPrice) }}</td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script>
import userAvatar from '../assets/svg/user-avatar.vue'
import statusChart from '../cmps/status-chart.vue'
import { socketService, SOCKET_EVENT_ORDER_ADDED } from '../services/socket.service'

export default {
  name: 'orders-list',
  props: {},
  data() {
    return {
      statusData: ['Approved', 'Pending', 'Declined'],
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      options: [
        {
          value: 'approved',
          label: 'Approve',
        },
        {
          value: 'declined',
          label: 'Decline',
        },
      ],
    }
  },
  async created() {
    socketService.on(SOCKET_EVENT_ORDER_ADDED, order => {
      console.log('order-added');
      this.$store.commit({ type: 'addOrder', order })
    })
    try {
      await this.$store.dispatch({ type: 'loadOrders' })
      await this.$store.dispatch({ type: 'loadStay', id: this.orders[0].stay._id })

      socketService.login('6390a4d768ad08edacc01167')

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
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US')
    },
    styleStatus(status) {
      return {
        approved: status === 'approved',
        pending: status === 'pending',
        declined: status === 'declined',
      }
    },
    bgStyleByStatus(status) {
      return {
        'bg-approved': status === 'approved',
        'bg-pending': status === 'pending',
        'bg-declined': status === 'declined',
      }
    },
    async updateOrder(order) {
      await this.$store.dispatch({ type: 'updateOrder', order })
    },
    averageRating() {
      const reviews = this.selectedStay.reviews
      let average =
        reviews.reduce((sum, review) => {
          return sum + +review.rate
        }, 0) / reviews.length

      return average.toFixed(2)
    }
  },
  computed: {
    orders() {
      return JSON.parse(JSON.stringify(this.$store.getters.orders))
    },
    selectedStay() {
      return this.$store.getters.selectedStay
    },
    monthlyEarning() {
      console.log(this.ord)

      const cuurMonth = new Date(Date.now()).getMonth()
      const monthlyOrders = this.orders.filter(order => {
        const orderMonth = new Date(Date.parse(order.createdAt)).getMonth()
        return orderMonth === cuurMonth
      })

      const sum = monthlyOrders.reduce(
        (acc, { totalPrice } = order) => {
          return acc + totalPrice
        },
        0
      )
      return sum.toLocaleString()
    },
  },
  components: {
    userAvatar,
    statusChart,
  },
}
</script>