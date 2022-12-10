<template>
  <section v-if="orders" class="orders-list">
    <div class="charts-container">
        <status-chart />
      </div>
    <h1 class="fs22 orders-list-title">Reservations</h1>

    <div v-for="currOrder in orders" class="orders-tables">
      <table>
        <tr :class="bgStyleByStatus(currOrder.status)">
          <th>Buyer</th>
          <td class="buyer no-padding-inline">{{ currOrder.buyer.fullname }}</td>

          <!-- <th class="buyer-details-td flex align-center justify-center">
            <div class="buyer-img-container">
              <img v-if="currOrder.buyer.imgUrl" :src="currOrder.buyer.imgUrl" alt="buyer profile image" />
              <user-avatar v-else />
            </div>
          </th> -->
        </tr>
        <tr>
          <th>Status</th>
          <td :class="styleStatus(currOrder.status)" class="fs14 bold">
            {{ currOrder.status }}
          </td>
          <el-select @change="updateOrder(currOrder)" v-model="currOrder.status" class="m-2"
            :placeholder="currOrder.status" size="small">
            <el-option v-for="status in options" :key="status.value" :label="status.label" :value="status.value" />
          </el-select>
        </tr>
        <tr>
          <th>Guests</th>
          <td>{{ formatGuests(currOrder.guests) }}</td>
        </tr>
        <tr>
          <td>
          <th>Check-in: </th>
          <p>{{ currOrder.startDate }}</p>
          </td>
          <td>
          <th class="no-padding-inline">Check-out: </th>
          <p>{{ currOrder.endDate }}</p>
          </td>
          <td>
          <th class="no-padding-inline">booked: </th>
          <p>{{ currOrder.createdAt }}</p>
          </td>
        </tr>
        <tr>
          <th>Listing</th>
          <td class="stay-name">{{ currOrder.stay.name }}</td>
        </tr>
        <tr>
          <th>Total Payout</th>
          <td class="total-payout">{{ formatTotalPrice(currOrder.totalPrice) }}</td>
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
      orders: null,
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
      // this.orders = JSON.parse(JSON.stringify(this.$store.getters.orders))
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
    styleStatus(status) {
      return {
        approved: status === 'approved',
        pending: status === 'pending',
        declined: status === 'declined',
      }
    },
    bgStyleByStatus(status) {
      console.log(status)
      return {
        'bg-approved': status === 'approved',
        'bg-pending': status === 'pending',
        'bg-declined': status === 'declined',
      }
    },
    async updateOrder(order) {
      await this.$store.dispatch({ type: 'updateOrder', order })
    },
  },
  computed: {
    orders() {
      return JSON.parse(JSON.stringify(this.$store.getters.orders))
    }
  },
  components: {
    userAvatar,
    statusChart,
  },
}
</script>